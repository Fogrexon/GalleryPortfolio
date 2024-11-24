import {FC} from "react";
import {BasicCard} from "../../components/cards/BasicCard.tsx";
import realface from '../../assets/realface.jpg'
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import researchList from '../../components/research/research.json';
import {ResearchCard} from "../../components/research/ResearchCard.tsx";

export const Research: FC = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      <BasicCard title={"Research"} className={"col-span-1 sm:col-span-3"}>
        <div className="avatar h-full flex justify-center items-center">
          <div className="h-24 w-24 rounded">
            <img alt={"Fogrex real face"} src={realface}/>
          </div>
        </div>
        <h3 className={"font-bold"}>Katsuyama Hidetaka</h3>
        <p>
          東京科学大学（元東京工業大学）大学院在学中。専門はHuman Computer
          Interaction。学部時代はスキーの学習支援システムの研究、修士は高速プロジェクタを用いた動的プロジェクションマッピングについての研究を行っている。
        </p>
        <h3 className={"font-bold"}>Research Topic</h3>
        <div>
          <span className="badge badge-outline m-1">Skill Acquisition</span>
          <span className="badge badge-outline m-1">Dynamic Projection</span>
          <span className="badge badge-outline m-1">Computer Graphics</span>
        </div>
        <h3 className={"font-bold"}>External Links</h3>
        <ul>
          <li>
            <Link to={'https://orcid.org/0000-0001-6221-1303'} className="inline-block p-1"
                  target={'_blank'}><FontAwesomeIcon icon={faArrowUpRightFromSquare}/> ORCID</Link>
          </li>
          <li>
            <Link to={'https://dl.acm.org/profile/99660657862'} className={"inline-block p-1"}
                  target={'_blank'}><FontAwesomeIcon icon={faArrowUpRightFromSquare}/> ACM</Link>
          </li>
        </ul>
      </BasicCard>
      {
        researchList.map((research) => {
          return (
            <ResearchCard title={research.title}
                          conferenceAcronym={research.conferenceAcronym}
                          doi={research.doi}
                          authors={research.authors}
                          abstract={research.abstract}
                          key={research.doi}
            />
          )
        })
      }
    </div>
  )
}