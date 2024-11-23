import {FC} from "react";
import {BasicCard} from "../../components/cards/BasicCard.tsx";
import {TimelineCard} from "../../components/about/TimelineCard.tsx";
import {SplitCard} from "../../components/cards/SplitCard.tsx";
import {HobbiesCard} from "../../components/about/HobbiesCard.tsx";
import {LinkButton} from "../../components/utils/LinkButton.tsx";
import {ProgrammingTable} from "../../components/about/ProgrammingTable.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

export const About: FC = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      <BasicCard title={"Basic Information"} className="col-span-1 sm:col-span-3">
        名前: Fogrex, 東京工業大学大学院在学中。専門はHuman Computer Interaction。Webフロント、ゲームクライアントエンジニア。
      </BasicCard>
      <TimelineCard className={"col-span-1 sm:col-span-3"}/>
      <BasicCard title={"Interests"}>
        <div>
          <div className="badge badge-outline m-1">HCI</div>
          <div className="badge badge-outline m-1">ComputerGraphics</div>
          <div className="badge badge-outline m-1">WebFrontend</div>
          <div className="badge badge-outline m-1">GameClient</div>
          <div className="badge badge-outline m-1">DataVisualization</div>
          <div className="badge badge-outline m-1">3DMotion</div>
          <div className="badge badge-outline m-1">DIYElectronics</div>
          <div className="badge badge-outline m-1">ElectronicDevice</div>

        </div>
      </BasicCard>
      <SplitCard title={"Research"} className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-1">
        Human Computer Interaction分野を専攻。学部時代はスキーシミュレータを用いたアルペンスキーの効果的な学習法について研究。
        修士では高速プロジェクタを用いた動的プロジェクションマッピングについて研究を行っている。
        <LinkButton to={"/research"}>詳細→</LinkButton>
      </SplitCard>
      <ProgrammingTable className="col-span-1 sm:col-span-3"/>
      <HobbiesCard className="col-span-1 sm:col-span-3"/>
      <SplitCard title={"Icon"}
                 className="">10秒で書いたアイコン。以後三角形がトレードマークになっている</SplitCard>
      <BasicCard title={"Contact"} className="">
        <ul>
          <li>X: @FagLexOn</li>
          <li>Email: fogrexon[at]gmail.com</li>
        </ul>
      </BasicCard>
      <BasicCard title={"External Links"} className="">
        <ul>
          <li>
            <Link to={'https://github.com/Fogrexon/'} className="inline-block p-1"><FontAwesomeIcon
              icon={faGithub}/></Link>
          </li>
          <li>
            <Link to={'https://x.com/home'} className="inline-block p-1"><FontAwesomeIcon icon={faXTwitter}/></Link>
          </li>
          <li>
            <Link to={'https://trap.jp/author/fogrex/'} className="inline-block p-1">traP Blog <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}/></Link>
          </li>
          <li>
            <Link to={'https://fogrexon.notion.site/'} className="inline-block p-1">Private Blog<FontAwesomeIcon
              icon={faArrowUpRightFromSquare}/></Link>
          </li>
        </ul>
      </BasicCard>
    </div>
  );
}
