import {FC} from "react";
import {BasicCard} from "../cards/BasicCard.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const LevelModal = () => {
  return (<>
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*@ts-expect-error*/}
      <button className="m-1" onClick={() => document.getElementById('level-modal')?.showModal()}>
        <FontAwesomeIcon icon={faInfoCircle}/>
      </button>
      <dialog id="level-modal" className="modal">
        <div className="modal-box">
          <ul>
            <li>Level1: チュートリアルや授業で書いたことがある。</li>
            <li>Level2: 調べながらアプリケーションが書ける。</li>
            <li>Level3: アプリケーションを作ったことがある。</li>
            <li>Level4: ライブラリ等を書くことができる。</li>
            <li>Level5: 言語仕様を理解している。</li>
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

const Rating: FC<{ rating: number, name: string }> = ({rating, name}) => {
  return (
    <div className="rating">
      <input type="radio" name={name} className="mask mask-star" checked={rating === 1}/>
      <input type="radio" name={name} className="mask mask-star" checked={rating === 2}/>
      <input type="radio" name={name} className="mask mask-star" checked={rating === 3}/>
      <input type="radio" name={name} className="mask mask-star" checked={rating === 4}/>
      <input type="radio" name={name} className="mask mask-star" checked={rating === 5}/>
    </div>
  )
}

export const ProgrammingTable: FC<{ className?: string }> = ({className}) => {
  return (
    <BasicCard title={"Programming Language Skills"} className={className}>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          <tr>
            <th></th>
            <th>Language</th>
            <th>Years of Experience</th>
            <th>
              Level
              <LevelModal/>
            </th>
            <th>Use Cases</th>
          </tr>
          </thead>
          <tbody>
          {/* Typescript */}
          <tr>
            <th>1</th>
            <td>Typescript</td>
            <td>8年</td>
            <td><Rating rating={5} name="ts-rate"/></td>
            <td>Web Frontend, Desktop Application, Data Visualization, Game Client</td>
          </tr>
          {/* React */}
          <tr>
            <th>2</th>
            <td>React</td>
            <td>6年</td>
            <td><Rating rating={4} name="react-rate"/></td>
            <td>Web Frontend, Desktop Application, Game Client</td>
          </tr>
          {/* C Sharp */}
          <tr>
            <th>3</th>
            <td>C#</td>
            <td>8年</td>
            <td><Rating rating={4} name="csharp-rate"/></td>
            <td>Unity, Desktop Application</td>
          </tr>
          {/* Python */}
          <tr>
            <td>4</td>
            <td>Python</td>
            <td>6年</td>
            <td><Rating rating={4} name="python-rate"/></td>
            <td>Data Analyze, Research, Computer Graphics, Image Processing</td>
          </tr>
          {/* C++ */}
          <tr>
            <td>5</td>
            <td>C++</td>
            <td>2年</td>
            <td><Rating rating={4} name="cpp-rate"/></td>
            <td>Research, Computer Graphics, Image Processing</td>
          </tr>
          {/* Go */}
          <tr>
            <td>6</td>
            <td>Go</td>
            <td>4年</td>
            <td><Rating rating={3} name="go-rate"/></td>
            <td>Server Side</td>
          </tr>
          {/* Vue */}
          <tr>
            <th>7</th>
            <td>Vue</td>
            <td>2年</td>
            <td><Rating rating={2} name="vue-rate"/></td>
            <td>Web Frontend, Desktop Application</td>
          </tr>
          {/* Rust */}
          <tr>
            <td>8</td>
            <td>Rust</td>
            <td>1年</td>
            <td><Rating rating={2} name="rust-rate"/></td>
            <td>Desktop Application, WASM</td>
          </tr>
          </tbody>
        </table>
      </div>
    </BasicCard>
  )
}
