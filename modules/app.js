import path from 'path';
import {Playground} from "./playground.js";
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__filename)
console.log(__dirname)
