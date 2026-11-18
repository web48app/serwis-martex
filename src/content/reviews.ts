import type { Review } from '@shared/reviews';

/**
 * Opinie zapasowe (przepisane z wizytówki Google, listopad 2026; bez daty) — wyświetlane, dopóki /api/opinie
 * nie zwraca danych z Google Business Profile API.
 */
export const fallbackReviews: Review[] = [
  {
    name: 'Artur B.',
    stars: 5,
    date: '',
    reply: '',
    text: 'Zleciłem wymianę oleju, opon oraz tarcz i klocków hamulcowych. Wszystkie prace zrealizowane terminowo i z należytą starannością. Obsługa miła, a przede wszystkim fachowa – na bieżąco informuje o opcjach naprawy i kosztach.',
  },
  {
    name: 'Dariusz G.',
    stars: 5,
    date: '',
    reply: '',
    text: 'Wykrycie usterki zajęło kilka minut, gdzie ja od kilku dni nie mogłem jej zlokalizować, czas naprawy poniżej jednej godziny. Miła obsługa i profesjonalne podejście do klienta.',
  },
  {
    name: 'Mateusz B.',
    stars: 5,
    date: '',
    reply: '',
    text: 'Zadzwoniłem w sobotę ok. 12:00. Problemy z wentylatorem i układem chłodniczym. Panowie mimo ruchu przyjęli, sprawdzili, zdiagnozowali i naprawili. Wiedza i postawa do klienta na najwyższym poziomie.',
  },
  {
    name: 'Dorota K.',
    stars: 5,
    date: '',
    reply: '',
    text: 'Polecam z czystym sumieniem! Pan szybko przyjechał do rozładowanego akumulatora i pomógł uruchomić samochód. Następnego dnia wymienił akumulator i trafnie zdiagnozował usterkę.',
  },
  {
    name: 'Zbig G.',
    stars: 5,
    date: '',
    reply: '',
    text: 'Szybka i sprawna naprawa czujników cofania w zderzaku oraz lampy przeciwmgielnej. Profesjonalna obsługa i szybka pomoc w rozwiązaniu problemu.',
  },
];
