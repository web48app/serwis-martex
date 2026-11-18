import type { FaqItem, PriceCategory } from './types';

/** Ceny orientacyjne robocizny, brutto, „od”. Zmień kwoty po uzgodnieniu z właścicielem. */
export const priceCategories: PriceCategory[] = [
  {
    id: 'opony',
    title: 'Opony i koła',
    items: [
      { name: 'Wymiana opon z wyważeniem — felgi stalowe 15–16"', from: 150, unit: 'kpl' },
      { name: 'Wymiana opon z wyważeniem — felgi stalowe 17–18"', from: 180, unit: 'kpl' },
      { name: 'Wymiana opon z wyważeniem — alufelgi 15–16"', from: 170, unit: 'kpl' },
      { name: 'Wymiana opon z wyważeniem — alufelgi 17" i większe', from: 200, unit: 'kpl' },
      { name: 'Naprawa opony z wyważeniem', from: 90, unit: 'szt' },
      { name: 'Programowanie czujnika TPMS', from: 20, unit: 'szt' },
    ],
  },
  {
    id: 'eksploatacja',
    title: 'Eksploatacja',
    items: [
      { name: 'Wymiana oleju z filtrem', from: 70 },
      { name: 'Wymiana filtra kabinowego', from: 50 },
      { name: 'Wymiana filtra powietrza', from: 50 },
      { name: 'Wymiana płynu hamulcowego', from: 160 },
      { name: 'Wymiana świec zapłonowych (do 4 szt.)', from: 80 },
      { name: 'Wymiana świec żarowych', from: 110 },
    ],
  },
  {
    id: 'hamulce',
    title: 'Hamulce',
    items: [
      { name: 'Tarcze i klocki — przód', from: 240 },
      { name: 'Tarcze i klocki — tył', from: 230 },
      { name: 'Wymiana samych klocków (oś)', from: 120 },
      { name: 'Regeneracja zacisku hamulcowego', from: 300 },
      { name: 'Wymiana linki hamulca ręcznego', from: 170 },
    ],
  },
  {
    id: 'klimatyzacja',
    title: 'Klimatyzacja',
    items: [
      { name: 'Napełnienie klimatyzacji', from: 240 },
      { name: 'Odgrzybianie ozonem', from: 140 },
      { name: 'Sprawdzenie szczelności układu', from: 150 },
      { name: 'Pełny serwis z ozonowaniem', from: 380 },
    ],
  },
  {
    id: 'diagnostyka',
    title: 'Diagnostyka i elektryka',
    items: [
      { name: 'Odczyt i kasowanie błędów', from: 150 },
      { name: 'Pełna diagnostyka z szukaniem usterki', from: 300 },
      { name: 'Wymiana alternatora', from: 240 },
      { name: 'Regeneracja rozrusznika', from: 190 },
      { name: 'Test akumulatora i ładowania', from: null },
    ],
  },
  {
    id: 'zawieszenie',
    title: 'Zawieszenie i wydech',
    items: [
      { name: 'Wymiana łącznika stabilizatora', from: 110 },
      { name: 'Wymiana amortyzatorów — przód (para)', from: 330 },
      { name: 'Wymiana łożyska koła', from: 220 },
      { name: 'Wymiana sprężyny zawieszenia', from: 150 },
      { name: 'Wymiana tłumika końcowego', from: 190 },
    ],
  },
];

export const individualQuotes = [
  { title: 'Rozrząd', text: 'pasek / łańcuch, pompa wody' },
  { title: 'Sprzęgło i dwumas', text: 'komplet, koło dwumasowe' },
  { title: 'Skrzynie biegów', text: 'diagnoza i naprawa' },
  { title: 'Remonty silników', text: 'uszczelka głowicy, remont' },
  { title: 'Turbosprężarki', text: 'regeneracja, wymiana' },
  { title: 'Sprężarka klimy', text: 'skraplacz, sprężarka' },
  { title: 'Usterki elektryczne', text: 'nietypowe i ukryte awarie' },
  { title: 'Naprawy powypadkowe', text: 'mechanika po kolizji' },
];

export const pricingFaq: FaqItem[] = [
  {
    q: 'Dlaczego ceny są „od”?',
    a: 'Ta sama usługa w różnych autach zajmuje różnie dużo czasu — dostęp do podzespołów, zapieczone śruby, rozmiar kół. Cena „od” to najniższy typowy koszt; dokładną kwotę podamy po oględzinach.',
  },
  {
    q: 'Czy w cenie są części?',
    a: 'Nie — cennik dotyczy robocizny. Części dobieramy do Twojego auta i przedstawiamy koszt przed naprawą.',
  },
  {
    q: 'Czy mogę przywieźć własne części?',
    a: 'Tak, możemy wykonać naprawę na częściach dostarczonych przez klienta. Daj znać przy umawianiu.',
  },
  {
    q: 'Czy dowiem się o kosztach przed naprawą?',
    a: 'Tak. Po diagnozie mówimy, co trzeba zrobić, jakie są opcje i ile to kosztuje — decyzja należy do Ciebie.',
  },
];
