import {FC} from "react";
import {BasicCard} from "../cards/BasicCard.tsx";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

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
      {authors.join(", ")}
      <br/>
      {conferenceAcronym}
      <br/>
      <Link to={doi}><FontAwesomeIcon icon={faArrowUpRightFromSquare}/> {doi}</Link>
      <p>
        {abstract}
      </p>
    </BasicCard>
  )
}