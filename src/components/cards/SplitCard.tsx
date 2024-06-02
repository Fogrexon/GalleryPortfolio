import {BasicCard} from "./BasicCard.tsx";
import {FC, ReactNode} from "react";
import fogrexIcon from '../../assets/fogrex.jpg'

type SplitCardProps = {
  title: string
  className?: string;
  children: ReactNode
}

export const SplitCard: FC<SplitCardProps> = ({className, title, children}) => {
  return (
    <BasicCard title={title} className={className}>
      <div className="flex w-full h-full flex-col sm:flex-row">
        <div className="avatar h-full flex justify-center items-center">
          <div className="h-24 w-24 rounded">
            <img src={fogrexIcon}/>
          </div>
        </div>
        <div className="divider divider-vertical sm:divider-horizontal"></div>
        <div className="grid h-full flex-grow place-items-center">{children}</div>
      </div>
    </BasicCard>
  )
}