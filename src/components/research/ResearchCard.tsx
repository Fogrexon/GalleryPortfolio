import {FC} from "react";
import {BasicCard} from "../cards/BasicCard.tsx";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {ReadMoreContent} from "./ReadMoreContent.tsx";

type ResearchCardProps = {
  title: string
  conferenceAcronym: string
  doi: string
  authors: string[]
  abstract: string
}

export const ResearchCard: FC<ResearchCardProps> = ({title, conferenceAcronym, doi, authors, abstract}) => {
  return (
    <BasicCard title={title} className={'col-span-1 sm:col-span-3'}>
      <div>
        {authors.map((author, i) => {
          const separator = i === authors.length - 1 ? '' : ', '
          if (author === 'Hidetaka Katsuyama') {
            return (
              <><span className={'font-bold inline'}>{author}</span> {separator}</>
            )
          } else {
            return author + separator
          }
        })}
      </div>
      {conferenceAcronym}
      <br/>
      <Link to={doi}><FontAwesomeIcon icon={faArrowUpRightFromSquare}/> {doi}</Link>
      <ReadMoreContent>
        {abstract}
      </ReadMoreContent>
    </BasicCard>
  )
}