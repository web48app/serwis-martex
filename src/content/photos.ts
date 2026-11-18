/**
 * Zdjęcia z wizytówki Google — używane tylko jako zapas, dopóki w /public/img/realizacje/
 * nie ma lokalnych plików 01.jpg … 10.jpg. Po wgraniu własnych zdjęć tę listę można wyczyścić.
 */
const GOOGLE_PHOTO_IDS: Record<number, string> = {
  1: 'ANWiy9TKuaGRZvZj6XG8JIaQxsg5EH4U5PMdd4G0hSxThVGk_t8zndh0m91kh_t_zsp5yVTJz1c2xNlKtMeWD_N1UOaD_PCdlOPum3pT9BG5hiyYAdVM0117_fyGCsP-Jnsl9SMoKIKm',
  2: 'ANWiy9RyYBV1VIFLvzIp3AvIgFYM4yvlhMdHrUDYlAoYTRIg7o0Pn_bIMJKxF4tcLEFrGjRlH4eyAxOa2qTDGtF6WnFDo_8wusIwTxdq5RySQkBPqG8-tTpsHoEw1PlgzaHYsmfl2AH-K8WP9J30',
  3: 'ANWiy9SvQKIXMf7FhXQLwQG8IziBdZh3W4jDBiuj137gu3AQMgCBUjRHz0w8F9vwJhV7DMcDL5V3DSTGGGHGWKeRDopwzreYitM4yIyJeqkvW7QuUkZqULuh0pXKQ9_wCvsE2ozmp5FLig',
  4: 'ANWiy9QheW7f77sPSWj_KQb7iNS5KFa70NtBkxY1Q7rriLonUO7DEvSc0PdUAhIpQD5tbXXrP1lt1AUvwqOdlGlzSAAJrSiTt5Sq8iCohHPedgfzmVFlabCGPp7QO8U6C-VAWm68sAnFxQ',
  5: 'ANWiy9QcQ_LMXmbe75J9CsT4yjSfhlDegNllDeosk8r3QKObutIxNinIXwvIsMt-jpkJs4GPsziLccFz48C7Ktw7rxaAonSlw5CUKvjS-nnyk1HUAzHGH4MjSJFPo4tR21xX_tGsMTGCQ_Mbrylm',
  6: 'ANWiy9TA79dce1bnHYWftOt6_KlEmkg0ZvnbliS0vSxRNxTPE4RWGsS25FwP6k2SILhzcP9ec4Uw0aEUNExPpMhlGzUtqQGOtyC0wiq7GkyzeN39QIKsbR6eRY10Hi0LL2IQslXqpAg',
  7: 'ANWiy9SalTQ1DdoFfF5SbHaZ1EkNiq-p8RSyXn0rAIKTE1NRKlq0ShhO3_KwSJsNL0pkJk279Qd2xQnWyQcqGsewLPs2VHvmjwL_BJs-9C9rHtq0aoLbe3_K7HX7ZeSWtsIqLyAs36n6z9B1buwm',
  8: 'ANWiy9SjfX6mfFpaCpo1h5fOZNTkJlrchCEFesiIKK4_gJBUlfxMEfhv5BIULLeOb58BdAt4yUeoO7qs0yJ1TVZvI-H1c_1eyegH90x0aSMKgSoEeB3bXiV2lPAl5zw2nLGduRA3nmKuSACb-5tj',
  9: 'ANWiy9RVZhyNFJoJEhW6LK5fX0Br1_rhywQxp7xUEPLQtZDnHWIbb1Vnof51kWB2GPYCiT5W_z-Yogt4fAqnXKSvXxGyZuW1lH26Uk-RuHS4JwOsx2J7jQjn-hQma-BjRKcsFvK-CIv6fA',
  10: 'ANWiy9Str8XsHWrC6LjwfYidkVPlYvLk1Mc7qwibNSGKbGaBPyBzAbaJGFJVTi08bOYi7FfbK6Yf4_sHudQtFuPflQqt85X6HqsCNrh40Tm6aU2N_nSNlaszA0HP3uafdCq58iZ_RII6yQ',
};

export function localPhotoUrl(n: number): string {
  return `/img/realizacje/${String(n).padStart(2, '0')}.jpg`;
}

export function fallbackPhotoUrl(n: number, width = 1600): string | undefined {
  const id = GOOGLE_PHOTO_IDS[n];
  return id ? `https://lh3.googleusercontent.com/gps-cs-s/${id}=w${width}-k-no` : undefined;
}

/** Zdjęcia w galerii „Prosto z kanału” na stronie głównej (kolejność = układ mozaiki). */
export const homeGallery = [
  { n: 4, alt: 'Samochody na podnośnikach w warsztacie' },
  { n: 9, alt: 'Czerwone BMW w serwisie' },
  { n: 1, alt: 'Naprawa silnika — rozrząd' },
  { n: 5, alt: 'Diagnostyka elektryki' },
  { n: 7, alt: 'Auto na podnośniku' },
  { n: 10, alt: 'Naprawa skrzyni biegów' },
  { n: 8, alt: 'Komora silnika' },
  { n: 3, alt: 'Dostawczak na podnośniku' },
  { n: 2, alt: 'Serwis koła i hamulców' },
  { n: 6, alt: 'Naprawa pod maską' },
];
