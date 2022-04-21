import "../styles/globals.css";
import { LoadScriptNext } from "@react-google-maps/api";

const libraries = [
  "drawing",
  "geometry",
  "localContext",
  "places",
  "visualization",
];

function MyApp({ Component, pageProps }) {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      libraries={libraries}
    >
      <Component {...pageProps} />
    </LoadScriptNext>
  );
}

export default MyApp;
