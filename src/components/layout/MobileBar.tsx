import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { links } from '@/content/company';
import './MobileBar.css';

export function MobileBar() {
  return (
    <div className="mbar island">
      <a href={links.tel}>
        <Phone aria-hidden="true" />
        Zadzwoń
      </a>
      <Link to="/kontakt#dojazd">
        <MapPin aria-hidden="true" />
        Dojazd
      </Link>
    </div>
  );
}
