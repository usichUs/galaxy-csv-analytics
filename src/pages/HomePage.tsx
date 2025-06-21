import { Header } from "../components/Header";
import { Highlights } from "../components/Highlights";
import { Uploader } from "../components/Uploader";

export default function HomePage() {
  return (
    <>
      <Header />
      <Uploader />
      <Highlights />
    </>
  );
}
