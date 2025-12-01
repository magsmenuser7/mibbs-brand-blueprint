import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Act1WhyWeBuild from './Act1WhyWeBuild';
import Act2OurMission from './Act2OurMission';
import Act3MagsmenExpertise from './Act3MagsmenExpertise';
import Act4TheMovement from './Act4TheMovement';
import EpilogueFounderLetter from './EpilogueFounderLetter';

export default function AboutPage() {
  return (
    <div className="about-page bg-white">
      <Act1WhyWeBuild />
      <Act2OurMission />
      <Act3MagsmenExpertise />
      <Act4TheMovement />
      <EpilogueFounderLetter />
    </div>
  );
}
