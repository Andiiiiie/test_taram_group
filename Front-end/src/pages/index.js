import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToArticles = () => {
    router.push("/articles");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#fff", color: "#000" }}
    >
      <h1 className="mb-4">Bienvenue sur mon application !</h1>
      <p className="mb-4 text-center">
        Découvrez nos articles et posez vos questions au chat interactif.
      </p>
      <button className="btn btn-dark btn-lg" onClick={goToArticles}>
        Aller aux Articles
      </button>
    </div>
  );
}
