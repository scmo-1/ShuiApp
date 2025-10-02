import Header from "./components/Header";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <Header />
      <main className="pt-40 px-3  flex flex-col items-center min-h-screen">
        <MainPage />
      </main>
    </>
  );
}

export default App;
