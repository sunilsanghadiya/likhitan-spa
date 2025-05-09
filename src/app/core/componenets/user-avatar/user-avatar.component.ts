import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-user-avatar',
  imports: [
    NzAvatarComponent,
    CommonModule
  ],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent  implements OnInit, OnChanges {
  
  @Input() name: string = '';
  @Input() size: number = 38;
  @Input() backgroundColor: string = '';
  @Input() textColor: string = '#ffffff';
  @Input() rounded: boolean = true;
  @Input() fontSizeRatio: number = 0.4;
  @Input() userAvatarUrl?: string;
  @Output() onChange = new EventEmitter<{ initials: string; backgroundColor: string; style: any; }>();

  initials: string = '';
  style: any = {};
  statusStyle: any = {};


  ngOnInit(): void {
    this.generateAvatar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const needsRegeneration = Object.keys(changes).some(key => key !== 'userAvatarUrl' && key !== 'status' && changes[key].firstChange === false);
    if (needsRegeneration) {
      this.generateAvatar();
    } else if (changes['userAvatarUrl'] || changes['status']) {
      this.updateStyles();
    }
  }

  private updateStyles(bgColor?: string): void {
    if (this.userAvatarUrl) {
      this.style = {
        'width.px': this.size,
        'height.px': this.size,
        'background-image': `url('${this.userAvatarUrl}')`,
        'background-size': 'cover',
        'background-position': 'center',
        'border-radius': this.rounded ? '50%' : '0',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      };
    } else {
      this.style = {
        'width.px': this.size,
        'height.px': this.size,
        'background-color': bgColor || this.backgroundColor || this.getRandomColor(),
        'color': this.textColor,
        'font-size': `${this.size * this.fontSizeRatio}px`,
        'border-radius': this.rounded ? '50%' : '0',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-weight': 'bold',
        'text-transform': 'uppercase'
      };
    }

    // this.statusStyle = {};
  }

  private generateAvatar(): void {
    this.initials = this.getInitials(this.name);

    const bgColor = this.backgroundColor || this.getRandomColor();

    // Set styles
    this.style = {
      'width.px': this.size,
      'height.px': this.size,
      'background-color': bgColor,
      'color': this.textColor,
      'font-size': `${this.size * this.fontSizeRatio}px`,
      'border-radius': this.rounded ? '50%' : '0',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-weight': 'bold',
      'text-transform': 'uppercase'
    };
  }

  private getInitials(name: string): string {
    if (!name) return '';

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0);
    }
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
