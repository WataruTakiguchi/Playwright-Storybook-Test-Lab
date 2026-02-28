import { useState } from "react";
import { homeQa } from "../testids";

type ExampleCardProps = {
  title: string;
};

export function ExampleCard({ title }: ExampleCardProps) {
  const [count, setCount] = useState(0);
  const [draftName, setDraftName] = useState("");
  const [displayName, setDisplayName] = useState("未設定");
  const applyDisplayName = () => {
    setDisplayName(draftName || "未設定");
  };

  return (
    <section className="card" data-testid={homeQa.exampleCard.root}>
      <p className="eyebrow">共有testidは1つの定義に集約しています。</p>
      <h1 data-testid={homeQa.exampleCard.title}>{title}</h1>
      <p>
        目に見える要素の操作はroleベース、安定した構造の参照はgetByTestId
        を使います。
      </p>
      <form
        className="inline-form"
        data-testid={homeQa.exampleCard.form}
        onSubmit={(event) => {
          event.preventDefault();
          applyDisplayName();
        }}
      >
        <label className="field">
          <span>表示テキスト</span>
          <input
            type="text"
            value={draftName}
            data-testid={homeQa.exampleCard.nameInput}
            onChange={(event) => setDraftName(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="button button-secondary"
          data-testid={homeQa.exampleCard.applyButton}
        >
          反映する
        </button>
      </form>
      <p className="message" data-testid={homeQa.exampleCard.message}>
        現在の表示: {displayName}
      </p>
      <button
        type="button"
        className="button"
        data-testid={homeQa.exampleCard.button}
        onClick={() => setCount((value) => value + 1)}
      >
        クリック回数: {count}
      </button>
    </section>
  );
}
