# Outreach drafts, round 2 (2026-10-31)

Four drafts for the owner to send or apply. None of them has been sent. Order: send (b) first, then apply (d) yourself, then send (a) and (c). Contact addresses are not guessed here: use the current contacts listed on aus.edu.

The goal of every draft is one plain, followed link from an AUS page to ahmadsaad.dev, so search engines and AI assistants can tie "Ahmad Atef Saad" (the AUS form of the name) to the site. Ask for normal links: no rel="nofollow".

---

## (a) AUS Office of Communications

Where: the Office of Communications contact on https://www.aus.edu/media (the article has no byline).

Subject: Small addition to the 22 June 2026 Tau Beta Pi Scholarship story

Dear AUS Office of Communications team,

Thank you again for the news story "AUS engineering student receives competitive Tau Beta Pi Scholarship" (https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship), published on 22 June 2026. I am Ahmad Atef Saad, the student featured. Would it be possible to add one line at the end of the article, reading "Portfolio: https://ahmadsaad.dev/aus"? That page collects the AUS work the article describes, including Tau Beta Pi UAE Alpha, the AI Hub and the LoRaWAN sensor node research, so readers and employers can find it in one place. I am happy to send the exact wording or a short bio if that is easier. Thank you for your time and for supporting students like me.

Kind regards,
Ahmad Atef Saad
Computer Engineering, Class of 2026

---

## (b) CITL director, courtesy note before (d)

Where: Dr. Norita Ahmad, Director, Center for Innovation in Teaching and Learning. You maintain aihub.aus.edu, so this is a heads-up, not a request. Send it a few days before you apply (d).

Subject: Adding a link on my AI Hub team page

Dear Dr. Norita Ahmad,

I would like to make a small update to my own entry on the AI Hub website. I plan to add a short bio to my team page (https://aihub.aus.edu/team/mr-ahmad/) with a link to https://ahmadsaad.dev/aus, a page on my personal site that summarizes my work at AUS, including the AI Hub redesign. I would also link the names on the About page team cards to each person's team page, so the five cards are consistent. Nothing else on the site changes. Unless you would prefer that I do not, I will make the change next week, and I am happy to share the exact text first. Thank you.

Ahmad

---

## (c) Tau Beta Pi UAE Alpha page maintainer

Where: whoever edits the College of Engineering student organizations page (https://www.aus.edu/cen/community/student#student-clubs-and-organizations), or the chapter contact on tbp.org if the chapter has a page there.

Subject: Officer listing for UAE Alpha

Hello,

I am Ahmad Atef Saad, current President of Tau Beta Pi UAE Alpha at the American University of Sharjah. If the chapter has a page on the AUS or tbp.org site, could you list me as President and link my name to https://ahmadsaad.dev/aus#tau-beta-pi? I can also supply a short bio and photo. If a student organizations page already lists the chapter, please let me know who edits it. Thank you.

Ahmad Atef Saad

---

## (d) Self-serve edits on aihub.aus.edu (WordPress)

Apply after sending (b). Both edits are on pages you already maintain.

### 1. Team page bio

Page: https://aihub.aus.edu/team/mr-ahmad/ (the "team" custom post type). Put this in the bio field:

> Ahmad Saad (Ahmad Atef Saad) is a Computer Engineering senior at the American University of Sharjah and an AI Hub Assistant at the Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website. He is President of Tau Beta Pi UAE Alpha. Website: ahmadsaad.dev

Links: "ahmadsaad.dev" goes to https://ahmadsaad.dev/ and either the words "AI Hub Assistant" or a second line "More on his work at AUS" go to https://ahmadsaad.dev/aus. Plain followed links: no rel="nofollow", no target needed.

Option A, the words "AI Hub Assistant" linked (paste in the code or HTML view):

```html
<p>Ahmad Saad (Ahmad Atef Saad) is a Computer Engineering senior at the American University of Sharjah and an <a href="https://ahmadsaad.dev/aus">AI Hub Assistant</a> at the Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website. He is President of Tau Beta Pi UAE Alpha. Website: <a href="https://ahmadsaad.dev/">ahmadsaad.dev</a></p>
```

Option B, a second line (reads more naturally on the AI Hub's own site):

```html
<p>Ahmad Saad (Ahmad Atef Saad) is a Computer Engineering senior at the American University of Sharjah and an AI Hub Assistant at the Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website. He is President of Tau Beta Pi UAE Alpha. Website: <a href="https://ahmadsaad.dev/">ahmadsaad.dev</a></p>
<p><a href="https://ahmadsaad.dev/aus">More on his work at AUS</a></p>
```

If an SEO or security plugin adds rel="nofollow" to external links automatically, exclude these two links (or the ahmadsaad.dev domain) in its settings.

### 2. About page team card

Page: https://aihub.aus.edu/about/, the fifth "Meet the team" card ("Ahmad Saad, AI Hub Assistant"). Make the name "Ahmad Saad" a link to the team page https://aihub.aus.edu/team/mr-ahmad/. The cards are rendered by JavaScript, so the change goes in the data that feeds them: the team data array in the theme or block that renders the cards, or a link or URL field on the team custom post type if the cards read one. Today no card links to its team page, so the team page is reachable only through the sitemap; linking all five cards the same way helps every team member and keeps the cards consistent.

### Check after saving

```bash
curl -s https://aihub.aus.edu/team/mr-ahmad/ | grep -c "ahmadsaad.dev"                       # at least 1
curl -s https://aihub.aus.edu/team/mr-ahmad/ | grep -o '<a [^>]*ahmadsaad\.dev[^>]*>'          # no "nofollow" in the output
```

For the About card (rendered by JavaScript), open https://aihub.aus.edu/about/ in a browser, right click the name "Ahmad Saad" in the fifth card and check that it opens https://aihub.aus.edu/team/mr-ahmad/.
