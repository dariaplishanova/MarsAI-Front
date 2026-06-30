import { FilmData } from "./home";

export interface AdminFilmPopupProps {
  film: FilmData | null;
  open: boolean;
  onClose: () => void;
}