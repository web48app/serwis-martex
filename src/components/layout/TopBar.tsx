import { Link } from 'react-router-dom';
import { company, links } from '@/content/company';
import { OpenStatus } from '@/components/ui/OpenStatus';
import './TopBar.css';

export function TopBar() {
  return (
    <div className="topbar island">
      <div className="wrap topbar__inner">
        <OpenStatus />
        <div className="topbar__right">
          <Link to="/kontakt#dojazd">
            {company.address.street}, {company.address.city}
          </Link>
          <a href={links.tel}>{company.phone.display}</a>
        </div>
      </div>
    </div>
  );
}
