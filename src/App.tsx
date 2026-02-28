import { ExampleCard } from "./components/ExampleCard";
import { appQa } from "./testids";

export default function App() {
  return (
    <main className="app-shell" data-testid={appQa.shell}>
      <ExampleCard title="Playwright + Storybookの基本構成" />
    </main>
  );
}
