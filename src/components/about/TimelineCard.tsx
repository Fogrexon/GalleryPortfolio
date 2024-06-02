import {FC} from "react";
import {BasicCard} from "../cards/BasicCard.tsx";

const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"/>
</svg>

type TimelineCardProps = {
  className?: string
};

export const TimelineCard: FC<TimelineCardProps> = ({className}) => {
  return (
    <BasicCard title={"Timeline"} className={className}>
      <ul className="timeline timeline-vertical sm:timeline-horizontal overflow-x-auto justify-center">
        <li>
          <div className="timeline-start">2000</div>
          <div className="timeline-middle">
            {checkIcon}
          </div>
          <div className="timeline-end timeline-box">生誕</div>
          <hr/>
        </li>
        <li>
          <hr/>
          <div className="timeline-start">2019</div>
          <div className="timeline-middle">
            {checkIcon}
          </div>
          <div className="timeline-end timeline-box">福井県立藤島高等学校卒業</div>
          <hr/>
        </li>
        <li>
          <hr/>
          <div className="timeline-start">2023</div>
          <div className="timeline-middle">
            {checkIcon}
          </div>
          <div className="timeline-end timeline-box">東京工業大学卒業</div>
          <hr/>
        </li>
        <li>
          <hr/>
          <div className="timeline-start">2025</div>
          <div className="timeline-middle">
            {checkIcon}
          </div>
          <div className="timeline-end timeline-box">東京工業大学大学院卒業見込み</div>
          <hr/>
        </li>
      </ul>
    </BasicCard>
  )
}