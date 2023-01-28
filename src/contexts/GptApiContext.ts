import { createContext } from "react";
import GptApi from "../gpt/GptApi";

export const GptApiContext = createContext<GptApi>(new GptApi());
