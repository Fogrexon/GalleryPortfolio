import {FC, ReactNode} from "react";
import {default as classNames} from "classnames";

type BasicCardProps = {
  className?: string,
  title: ReactNode
  children: ReactNode
}

export const BasicCard: FC<BasicCardProps> = ({
                                                className, title, children
                                              }) => {
  const cardClass = classNames("card bg-base-100 shadow-xl glass", className)
  return (
    <div className={cardClass}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  )
}