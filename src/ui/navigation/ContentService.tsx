import { Routes, Route } from "react-router-dom";
import HomeScreen from "@/ui/components/page/home/Screen";
import TranslateScreen from "@/ui/components/page/translate/Screen";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeScreen />} path="/" />
      <Route element={<TranslateScreen />} path="/translate" />
    </Routes>
  );
}
