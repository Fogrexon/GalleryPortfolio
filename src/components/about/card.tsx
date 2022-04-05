import { VFC } from "react";
import style from './card.module.scss';

const levelDiscription = [
  'I haven\'t used yet.',
  'I used in some lecture, or finished tutorial.',
  'I can use with some references, or teachers.',
  'I can make apps with this.',
  'I know this in detail.'
]

interface CardProps {
  src?: string;
  level: number;
  children: string;
}

export const Card: VFC<CardProps> = ({src, level, children}) => (
    <div className={style.card}>
      <div className={style.cardRing}>
        <svg  xmlns="http://www.w3.org/2000/svg" height="200" width="200" viewBox="0 0 200 200" data-value="40">
          <path className="bg" stroke="#ccc" d="M41 149.5a77 77 0 1 1 117.93 0"  fill="none"/>
          <path className="meter" stroke="#09c" d="M41 149.5a77 77 0 1 1 117.93 0" fill="none" strokeDasharray="350" strokeDashoffset={350 / 4 * (4 - level)}/>
        </svg>
        {src ? <img src={src} alt={`icon of ${children}`} /> : <span>{children}</span>}
      </div>
      <div className={style.cardHover}>
        <h4>{level}</h4>
        <div>
          {levelDiscription[Math.floor(level)]}
        </div>
      </div>
    </div>
  )