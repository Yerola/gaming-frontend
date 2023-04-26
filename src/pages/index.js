import { Button } from "semantic-ui-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>
        <h2>Videogames Shop</h2>
        <Button primary>Ir al login</Button>
      </div>
    </main>
  );
}
