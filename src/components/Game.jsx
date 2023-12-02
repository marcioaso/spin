
import "./Game.css";
import {player, enemy} from "./store"
import {spinPlayer,lock} from "./actions"
import { For, createSignal, createComputed} from "solid-js";

export default function Game() {
  return (
    <>
      <div class="game">
        <Board state={enemy()}/>
        <Board state={player()}/>
        <button onClick={() => spinPlayer()}>Spin</button>
      </div>
      <pre>
        {JSON.stringify(player(),null,2)}
      </pre>
    </>
  );
}

function Board(props) {
  const [char, setChar] = createSignal(props.state)
  createComputed(() => {
    setChar(props.state)
  })
  return (<div class="board">
    Life: {char().life}<br/>
    <Char title={"Left"} each={char().left}/>
    <Char title={"Right"} each={char().right}/>
    Wall: {char().wall}<br/>
    <Spin each={char().spin}/>
  </div>)
}
function Char(props) {
  const [each, setEach] = createSignal(props.each)
  createComputed(() => {
    setEach(props.each)
  })
  return (<div>
    {props.title}: {each().type.name} ({each().xp}/5) {each().type.turns - each().turn}
  </div>)
}

function Spin(props) {
  const [spin, setSpin] = createSignal(props.each)
  createComputed(() => {
    setSpin(props.each)
  })
  return (
    <For each={spin().list}>{(btn, i) => {
        const upgrades = btn.gem.upgrades?"blue":""
        const locked = btn.locked?"locked":""
        return (
          <button onClick={() => lock(i())} class={`${locked} ${upgrades}`}>{btn.gem.name}</button>
        )
      }}
    </For>
  )
}