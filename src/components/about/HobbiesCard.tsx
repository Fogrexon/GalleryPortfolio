import {BasicCard} from "../cards/BasicCard.tsx";
import {FC, ReactNode} from "react";
import {LinkButton} from "../utils/LinkButton.tsx";

type HobbiesCardProps = {
  className?: string;
}

const HobbyContent: FC<{ title: string, children?: ReactNode, checked?: boolean }> = ({title, children, checked}) => {
  return (
    <>
      <input type="radio" name="hobby-tab" role="tab" className="tab" aria-label={title} checked={checked}/>
      <div role="tabpanel" className="tab-content p-5">
        <div className="">
          <h3>{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}

export const HobbiesCard: FC<HobbiesCardProps> = ({className}) => {

  return (
    <BasicCard title={"Hobbies"} className={className}>
      <div role="tablist" className="tabs tabs-lifted w-full">
        <HobbyContent title={"Programming"} checked>
          <p>
            Webフロントやゲームクライアント、グラフィックス系のプログラミング。
          </p>
        </HobbyContent>
        <HobbyContent title={"WatchingMovies"}>
          主にSFの洋画や洋ドラやMCUなどのヒーローものの映画、アニメの鑑賞。
        </HobbyContent>
        <HobbyContent title={"Gadgets"}>
          マイコン等を使った電子工作やガジェットについて調べたり購入したりしている。
        </HobbyContent>
      </div>

      <div className="flex justify-center mt-5">
        <LinkButton to={"/gallery"}>ギャラリーページへ</LinkButton>
      </div>
    </BasicCard>
  )
}