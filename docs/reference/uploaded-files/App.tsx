import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CinematicJourney from "./pages/CinematicJourney";
import FoyerLanding from "./pages/FoyerLanding";
import GardenPathLanding from "./pages/GardenPathLanding";
import Foyer from "./pages/Foyer";
import Stairs from "./pages/Stairs";
import TheVault from "./pages/TheVault";
import TheGallery from "./pages/TheGallery";
import GrandFoyer from "./pages/GrandFoyer";
import GrandFoyerHub from "./pages/GrandFoyerHub";
import PicassoBlueRoom from "./pages/PicassoBlueRoom";
import PicassoCubistRoom from "./pages/PicassoCubistRoom";
import PicassoLaterAtelier from "./pages/PicassoLaterAtelier";
import ChagallWing from "./pages/ChagallWing";
import ModiglianWing from "./pages/ModiglianWing";
import RaphaelWing from "./pages/RaphaelWing";
import KandinskyWing from "./pages/KandinskyWing";
import LeonardoWing from "./pages/LeonardoWing";
import PatioLanding from "./pages/PatioLanding";
import MonetWing from "./pages/MonetWing";
import FridaWing from "./pages/FridaWing";
import DaVinciWorkshop from "./pages/DaVinciWorkshop";
import MatisseWing from "./pages/MatisseWing";
import BernardWing from "./pages/BernardWing";
import SecretGarden from "./pages/SecretGarden";
import GardenParty from "./pages/GardenParty";
import KikiMoulinRouge from "./pages/KikiMoulinRouge";
import Gallery from "./pages/Gallery";
import PieceLanding from "./pages/PieceLanding";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Cinematic Journey Entry Sequence */}
      <Route path="/" component={CinematicJourney} />
      <Route path="/foyer-landing" component={FoyerLanding} />
      <Route path="/garden-path" component={GardenPathLanding} />
      
      {/* Main Navigation Hubs */}
      <Route path="/foyer" component={Foyer} />
      <Route path="/stairs-landing" component={Stairs} />
      <Route path="/the-vault" component={TheVault} />
      <Route path="/the-gallery" component={TheGallery} />
      
      {/* Main Destinations */}
      <Route path="/grand-foyer" component={GrandFoyerHub} />
      <Route path="/garden-party" component={GardenParty} />
      
      {/* Artist Rooms - Upstairs */}
      <Route path="/artist-room/picasso-blue" component={PicassoBlueRoom} />
      <Route path="/artist-room/picasso-cubist" component={PicassoCubistRoom} />
      <Route path="/artist-room/picasso-later" component={PicassoLaterAtelier} />
      <Route path="/artist-room/chagall" component={ChagallWing} />
      <Route path="/artist-room/modigliani" component={ModiglianWing} />
      <Route path="/artist-room/raphael" component={RaphaelWing} />
      <Route path="/artist-room/kandinsky" component={KandinskyWing} />
      <Route path="/artist-room/leonardo" component={LeonardoWing} />
      
      {/* Artist Rooms - Outdoor/Patio */}
      <Route path="/patio-landing" component={PatioLanding} />
      <Route path="/artist-room/monet" component={MonetWing} />
      <Route path="/artist-room/frida" component={FridaWing} />
      <Route path="/artist-room/davinci" component={DaVinciWorkshop} />
      <Route path="/artist-room/matisse" component={MatisseWing} />
      <Route path="/artist-room/bernard" component={BernardWing} />
      
      {/* Kiki Experience */}
      <Route path="/kiki-moulin-rouge" component={KikiMoulinRouge} />
      
      {/* Other Routes */}
      <Route path="/secret-garden" component={SecretGarden} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/piece/:id" component={PieceLanding} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

