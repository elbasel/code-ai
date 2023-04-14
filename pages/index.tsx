// TODO Add Tests...
import { Theme } from "@components/Theme";
import { Window } from "@components/Window";
import { Canvas } from "@components/Canvas";
import { Screen } from "@components/Screen";
import Link from "next/link";

export default function Home() {
  return (
    <Theme>
      <Window>
        <Canvas>
          <Screen>
            <h1>Code AI</h1>
            <Link className="hover:text-blue-500" href="/Tour">
              Take the tour
            </Link>
          </Screen>
        </Canvas>
      </Window>
    </Theme>
  );
}
