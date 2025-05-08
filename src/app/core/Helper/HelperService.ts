import { HttpContextToken, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { AuthService } from "../../features/Services/authService/auth.service";
import { ModelService } from "../services/modelService/model.service";
import { Env } from "../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  passwordPattern = new RegExp(`^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`);
  isModalVisible: boolean = false;

  constructor(public _authService: AuthService, private _modelService: ModelService) { }

  IsUserAuthenticated(): Observable<boolean> {
    return this._authService.checkAuth().pipe(
      map((res: any) => {
        return true; // or some logic based on res
      }),
      catchError((error: any) => {
        localStorage.clear();
        console.log(error);
        return of(false);
      })
    );
  }

  public mergeHeaders(baseHeaders: HttpHeaders, additionalHeaders: Record<string, string>): HttpHeaders {
    let headers = baseHeaders;

    // Add or override headers with the additional ones
    for (const [key, value] of Object.entries(additionalHeaders)) {
      if (value !== undefined && value !== null) {
        headers = headers.set(key, value);
      }
    }

    return headers;
  }

  public ADDITIONAL_HEADERS = new HttpContextToken<Record<string, string>>(
    () => ({})
  );

  async generateKey(key: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(key), { name: 'PBKDF2' }, false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('a-unique-salt'), // Use a fixed or dynamic salt
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  async encryptData(data: any, key: CryptoKey): Promise<{ iv: Uint8Array; encrypted: ArrayBuffer }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv }, 
      key, 
      new TextEncoder().encode(JSON.stringify(data))
    );
    return { iv, encrypted };
  }
  
  async decryptData(): Promise<any> {
    const storedData = localStorage.getItem('encryptedData');
    if (!storedData) return null;
  
    try {
      const { iv, data } = JSON.parse(storedData);
      const key = await this.generateKey(Env.SECRET_KEY);
      if (key) {
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: new Uint8Array(iv) }, 
          key, 
          new Uint8Array(data).buffer
        );
        return JSON.parse(new TextDecoder().decode(decrypted));
      }
      return null;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }
  
  async prepareEncryptData(value: any) {
    try {
      const key = await this.generateKey(Env.SECRET_KEY);
      const encrypted = await this.encryptData(value, key);
      
      localStorage.setItem("encryptedData", JSON.stringify({
        iv: Array.from(encrypted.iv),
        data: Array.from(new Uint8Array(encrypted.encrypted)),
      }));
    } catch (error) {
      console.error('Encryption error:', error);
    }
  }
  
  async prepareDecryptData() {
    return await this.decryptData();
  }
}