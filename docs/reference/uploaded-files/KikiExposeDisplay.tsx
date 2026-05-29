import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, BookOpen, Award } from 'lucide-react';

interface KikiExposeDisplayProps {
  onDownload?: () => void;
}

export const KikiExposeDisplay: React.FC<KikiExposeDisplayProps> = ({ onDownload }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Premium Book Display */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-100">
          Kiki's Personal Ledger
        </h2>

        {/* 3D Book Mockup */}
        <div className="relative h-96 mb-8 flex items-center justify-center perspective">
          <div className="relative w-64 h-80 transform-gpu hover:scale-105 transition-transform duration-300"
               style={{
                 transformStyle: 'preserve-3d',
                 transform: 'rotateY(-15deg) rotateX(5deg)'
               }}>
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-black/30 rounded-lg blur-xl -z-10"></div>

            {/* Book Cover */}
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-amber-600">
              <img
                src="/manus-storage/kiki_expose_premium_cover_9f32b96d.png"
                alt="Kiki Exposé Cover"
                className="w-full h-full object-cover"
              />

              {/* Collector's Edition Badge */}
              <div className="absolute top-4 right-4 bg-amber-600 text-black px-3 py-1 rounded-full text-xs font-bold">
                COLLECTOR'S EDITION
              </div>

              {/* Spine Effect */}
              <div className="absolute -right-2 top-0 w-2 h-full bg-gradient-to-r from-amber-900 to-amber-700 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <Card className="bg-slate-900 border-amber-600 p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-100 mb-1">Collector's Edition</h3>
                <p className="text-sm text-gray-300">
                  Limited edition 220-page leather-bound exposé featuring Kiki's life through photography, film, literature, and music.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-100 mb-1">Comprehensive Biography</h3>
                <p className="text-sm text-gray-300">
                  10 chapters covering Kiki's rise from poverty to becoming the Queen of Montparnasse, with 700+ curated research links.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-600/30">
              <p className="text-xs text-amber-200 mb-2">CONTENTS INCLUDE:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>✦ Rare photographs by Man Ray, Jean Cocteau, and Constant Détré</li>
                <li>✦ Historical context of 1920s Paris and Montparnasse</li>
                <li>✦ Quotes from Ernest Hemingway and literary contemporaries</li>
                <li>✦ Information on iconic works including "Le Violon d'Ingres"</li>
                <li>✦ Artistic portraits and film stills</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Price & CTA */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-amber-400 mb-2">$65</div>
          <p className="text-sm text-gray-400 mb-4">Digital Collector's Edition (PDF)</p>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="border-amber-600 text-amber-100 hover:bg-amber-600/10"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Preview Pages
            </Button>

            <Button
              onClick={onDownload}
              className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Now
            </Button>
          </div>
        </div>

        {/* Certificate of Authenticity */}
        <Card className="bg-amber-50 border-amber-200 p-4 text-center">
          <p className="text-xs text-amber-900 font-semibold">
            ✦ CERTIFICATE OF AUTHENTICITY ✦
          </p>
          <p className="text-xs text-amber-800 mt-2">
            This digital edition is an official collector's item featuring the complete biography by Jana Misho, 
            author of "Almost Parisian" and "Annals from Montmartre."
          </p>
        </Card>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="mt-8 p-6 bg-slate-900 border border-amber-600 rounded-lg">
          <h3 className="text-xl font-bold text-amber-100 mb-4">Preview: First Pages</h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="bg-black p-4 rounded border border-amber-600/30">
              <p className="text-amber-200 font-bold mb-2">REMEMBERING THE QUEEN</p>
              <p>
                10 Essential Facts about the life and times of Kiki de Montparnasse, crowned "Queen of Montparnasse" in 1929 in a lavish ceremony.
              </p>
            </div>
            <div className="bg-black p-4 rounded border border-amber-600/30">
              <p className="text-amber-200 font-bold mb-2">RARE FILM SHORT</p>
              <p>
                "La Star du Quartier Dans les Années 20" - 1:30 runtime featuring Kiki dancing at her Cabaret the "Night" where she was crowned by cartoonist Henri Broca.
              </p>
            </div>
            <p className="text-center text-amber-400 text-xs pt-4">
              Download the full 220-page edition to read the complete biography...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
