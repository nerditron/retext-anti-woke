# Rules

## Pattern types

###### Basic

**Basic** patterns highlight possible inconsiderate terms and suggest
potentially more considerate alternatives.

###### Or

**Or** patterns highlight possible inconsiderate terms unless every category is
present and `binary` is on.
This is used for gendered work titles such as `garbageman and garbagewoman`, or
stuff like `his or her bike`.
Normally these are treated as basic patterns, but you can pass `binary: true`
to allow them.

**Or** patterns can be joined by `and`, `or`, or a slash (`/`).

## List of Rules

| id | type | not ok | ok |
| - | - | - | - |
| `actor-actress` | [or](#or) | `actress` (female), `actor` (male) | `performer`, `star`, `artist`, `entertainer` |
| `actors-actresses` | [or](#or) | `actresses` (female), `actors` (male) | `performers`, `stars`, `artists`, `entertainers` |
| `aircrewwoman-airman` | [or](#or) | `aircrewwoman` (female), `aircrew woman` (female), `aircrewman` (male), `airman` (male) | `pilot`, `aviator`, `airstaff` |
| `aircrewwomen-airmen` | [or](#or) | `aircrewwomen` (female), `aircrew women` (female), `aircrewmen` (male), `airmen` (male) | `pilots`, `aviators`, `airstaff` |
| `alderman-alderwoman` | [or](#or) | `alderwoman` (female), `alderman` (male) | `cabinet member` |
| `aldermen-alderwomen` | [or](#or) | `alderwomen` (female), `aldermen` (male) | `cabinet`, `cabinet members`, `alderperson` |
| `alumna-alumnus` | [or](#or) | `alumna` (female), `alumnus` (male) | `graduate` |
| `alumnae-alumni` | [or](#or) | `alumnae` (female), `alumni` (male) | `graduates` |
| `ancient-man` | [basic](#basic) | `ancient man` | `ancient civilization`, `ancient people` |
| `assemblyman-assemblywoman` | [or](#or) | `assemblywoman` (female), `assemblyman` (male) | `assembly person`, `assembly worker` |
| `aunt-uncle` | [or](#or) | `kinswoman` (female), `aunt` (female), `kinsman` (male), `uncle` (male) | `relative` |
| `aunts-uncles` | [or](#or) | `kinswomen` (female), `aunts` (female), `kinsmen` (male), `uncles` (male) | `relatives` |
| `authoress` | [basic](#basic) | `authoress` | `author`, `writer` |
| `average-housewife` | [basic](#basic) | `average housewife` | `average consumer`, `average household`, `average homemaker` |
| `average-man` | [basic](#basic) | `average man` | `average person` |
| `average-working-man` | [basic](#basic) | `average working man` | `average wage earner`, `average taxpayer` |
| `aviatrix` | [basic](#basic) | `aviatrix` | `aviator` |
| `basically` | [basic](#basic) | `basically` | |
| `bathroom-bill` | [basic](#basic) | `bathroom bill` | `non-discrimination law`, `non-discrimination ordinance` |
| `bi` | [basic](#basic) | `bi` | `bisexual` |
| `blackhat` | [basic](#basic) | `blackhat` | `unethical hacker`, `malicious actor` |
| `blacklist` | [basic](#basic) | `blacklist`, `black list` | `blocklist`, `wronglist`, `banlist`, `deny list` |
| `blacklisted` | [basic](#basic) | `blacklisted` | `blocklisted`, `wronglisted`, `banlisted`, `deny-listed` |
| `blacklisting` | [basic](#basic) | `blacklisting` | `blocklisting`, `wronglisting`, `banlisting`, `deny-listing` |
| `bogeyman-bogeywoman` | [or](#or) | `bogeywoman` (female), `bogeyman` (male) | `bogeymonster` |
| `bogieman-bogiewoman` | [or](#or) | `bogiewoman` (female), `bogieman` (male) | `bogeymonster` |
| `bogiemen-bogiewomen` | [or](#or) | `bogiewomen` (female), `bogiemen` (male) | `bogeymonsters` |
| `bondsman-bondswoman` | [or](#or) | `bondswoman` (female), `bondsman` (male) | `bonder` |
| `bondsmen-bondswomen` | [or](#or) | `bondswomen` (female), `bondsmen` (male) | `bonders` |
| `boogeyman-boogeywoman` | [or](#or) | `boogeywoman` (female), `boogeyman` (male) | `boogeymonster` |
| `boogieman-boogiewoman` | [or](#or) | `boogiewoman` (female), `boogieman` (male) | `boogeymonster` |
| `boogiemen-boogiewomen` | [or](#or) | `boogiewomen` (female), `boogiemen` (male) | `boogeymonsters` |
| `born-a-man` | [basic](#basic) | `biologically male`, `born a man`, `genetically male` | `assigned male at birth`, `designated male at birth` |
| `born-a-woman` | [basic](#basic) | `biologically female`, `born a woman`, `genetically female` | `assigned female at birth`, `designated female at birth` |
| `boy-girl` | [or](#or) | `girl` (female), `boy` (male) | `kid`, `child`, `youth` |
| `boyfriend-girlfriend` | [or](#or) | `girlfriend` (female), `boyfriend` (male) | `partner`, `friend`, `significant other` |
| `boyfriends-girlfriends` | [or](#or) | `girlfriends` (female), `boyfriends` (male) | `partners`, `friends`, `significant others` |
| `boyhood-girlhood` | [or](#or) | `girlhood` (female), `boyhood` (male) | `childhood` |
| `boyish-girly` | [or](#or) | `girly` (female), `girlish` (female), `boyish` (male) | `childish` |
| `bride-groom` | [or](#or) | `bride` (female), `groom` (male) | `spouse`, `newlywed` |
| `brother-sister` | [or](#or) | `sister` (female), `brother` (male) | `sibling` |
| `brotherhood-of-man` | [basic](#basic) | `brotherhood of man` | `the human family` |
| `brotherhood-sisterhood` | [or](#or) | `sisterhood` (female), `brotherhood` (male) | `kinship`, `community` |
| `brothers-sisters` | [or](#or) | `sisters` (female), `brothers` (male) | `siblings` |
| `bugreport` | [basic](#basic) | `bugreport` | `bug report`, `snapshot` |
| `calendar-girl` | [basic](#basic) | `calendar girl` | `model` |
| `call-girl` | [basic](#basic) | `call girl` | `escort`, `prostitute`, `sex worker` |
| `cameraman-camerawoman` | [or](#or) | `camerawoman` (female), `cameraman` (male) | `camera operator`, `camera person` |
| `cameramen-camerawomen` | [or](#or) | `camerawomen` (female), `cameramen` (male) | `camera operators` |
| `cattleman-cattlewoman` | [or](#or) | `cattlewoman` (female), `cattleman` (male) | `cattle rancher` |
| `cattlemen-cattlewomen` | [or](#or) | `cattlewomen` (female), `cattlemen` (male) | `cattle ranchers` |
| `caveman-cavewoman` | [or](#or) | `cavewoman` (female), `caveman` (male) | `troglodyte`, `hominidae` |
| `cavemen-cavewomen` | [or](#or) | `cavewomen` (female), `cavemen` (male) | `troglodytae`, `troglodyti`, `troglodytes`, `hominids` |
| `chairman-chairwoman` | [or](#or) | `chairwoman` (female), `chairman` (male) | `chair`, `head`, `chairperson`, `coordinator`, `committee head`, `moderator`, `presiding officer` |
| `chairmen-chairwomen` | [or](#or) | `chairwomen` (female), `chairmen` (male) | `chairs`, `chairpersons`, `coordinators` |
| `chick-cop-policeman` | [or](#or) | `policewoman` (female), `policeman` (male), `chick cop` (female) | `officer`, `police officer` |
| `churchman` | [basic](#basic) | `churchman` | `cleric`, `practicing Christian`, `pillar of the Church` |
| `clearly` | [basic](#basic) | `clearly` | |
| `clergyman-clergywoman` | [or](#or) | `clergywoman` (female), `clergyman` (male) | `clergyperson`, `clergy`, `cleric` |
| `clergymen-clergywomen` | [or](#or) | `clergywomen` (female), `clergymen` (male) | `clergies`, `clerics` |
| `cognitively-impaired` | [basic](#basic) | `cognitively impaired`, `person with cognitive disabilities` | `dimwit`, `thick`, `slow-witted` |
| `commit-suicide` | [basic](#basic) | `commit suicide`, `complete suicide`, `successful suicide` | `die by suicide` |
| `committed-suicide` | [basic](#basic) | `committed suicide`, `completed suicide` | `died by suicide` |
| `committee-man-committee-woman` | [or](#or) | `committee woman` (female), `committee man` (male) | `committee member` |
| `common-girl-common-man` | [or](#or) | `common girl` (female), `common man` (male) | `common person`, `average person` |
| `congressman-congresswoman` | [or](#or) | `congresswoman` (female), `congressman` (male) | `member of congress`, `congress person`, `legislator`, `representative` |
| `congressmen-congresswomen` | [or](#or) | `congresswomen` (female), `congressmen` (male) | `members of congress`, `congress persons`, `legislators`, `representatives` |
| `councilman-councilwoman` | [or](#or) | `councilwoman` (female), `councilman` (male) | `council member` |
| `councilmen-councilwomen` | [or](#or) | `councilwomen` (female), `councilmen` (male) | `council members` |
| `countryman-countrywoman` | [or](#or) | `countrywoman` (female), `countryman` (male) | `country person` |
| `countrymen-countrywomen` | [or](#or) | `countrywomen` (female), `countrymen` (male) | `country folk` |
| `cowboy-cowgirl` | [or](#or) | `cowgirl` (female), `cowboy` (male) | `cowhand` |
| `cowboys-cowgirls` | [or](#or) | `cowgirls` (female), `cowboys` (male) | `cowhands` |
| `dad-mom` | [or](#or) | `mama` (female), `mother` (female), `mom` (female), `mum` (female), `momma` (female), `mommy` (female), `papa` (male), `father` (male), `dad` (male), `pop` (male), `daddy` (male) | `parent` |
| `dads-moms` | [or](#or) | `mamas` (female), `mothers` (female), `moms` (female), `mums` (female), `mommas` (female), `mommies` (female), `papas` (male), `fathers` (male), `dads` (male), `daddies` (male) | `parents` |
| `dame-lord` | [or](#or) | `dame` (female), `lord` (male) | `official`, `owner`, `expert`, `superior`, `chief`, `ruler` |
| `dames-lords` | [or](#or) | `dames` (female), `lords` (male) | `officials`, `chiefs`, `rulers` |
| `daughter-son` | [or](#or) | `daughter` (female), `son` (male) | `child` |
| `daughters-sons` | [or](#or) | `daughters` (female), `sons` (male) | `children` |
| `delivery-boy-delivery-girl` | [or](#or) | `delivery girl` (female), `delivery boy` (male) | `courier`, `messenger` |
| `developmentally-delayed` | [basic](#basic) | `person with developmental disabilities`, `developmentally disabled person`, `individual with developmental challenges`, `developmentally delayed`, `person with developmental delays` | `retard`, `slow`, `simple`, `backward`, `dull` |
| `doorman-doorwoman` | [or](#or) | `doorwoman` (female), `doorman` (male) | `concierge` |
| `doormen-doorwomen` | [or](#or) | `doorwomen` (female), `doormen` (male) | `concierges` |
| `easy` | [basic](#basic) | `easy`, `easily` | |
| `emotionally-disturbed` | [basic](#basic) | `emotionally disturbed`, `person with emotional issues` | `unhinged`, `wreck`, `basket case` |
| `english-master` | [basic](#basic) | `english master` | `english coordinator`, `senior teacher of english` |
| `englishmen` | [basic](#basic) | `englishmen` | `the english` |
| `eskimo` | [basic](#basic) | `eskimo` | `Inuit` |
| `eskimos` | [basic](#basic) | `eskimos` | `Inuits` |
| `everyone-knows` | [basic](#basic) | `everyone knows` | |
| `executrix` | [basic](#basic) | `executrix` | `executor` |
| `fag` | [basic](#basic) | `fag`, `faggot`, `dyke`, `homo`, `sodomite` | `gay` |
| `failed-suicide` | [basic](#basic) | `failed suicide`, `failed attempt`, `suicide failure` | `suicide attempt`, `attempted suicide` |
| `father-of-*` | [basic](#basic) | `father of *` | `founder of` |
| `father-tongue-mother-tongue` | [or](#or) | `mother tongue` (female), `father tongue` (male) | `native tongue`, `native language` |
| `fatherland-motherland` | [or](#or) | `motherland` (female), `fatherland` (male) | `native land`, `homeland` |
| `fellowship` | [basic](#basic) | `fellowship` | `camaraderie`, `community`, `organization` |
| `females-males` | [or](#or) | `females` (female), `males` (male) | `humans` |
| `feminin-manly` | [or](#or) | `feminin` (female), `dudely` (male), `manly` (male) | `humanly`, `mature` |
| `femininity-manliness` | [or](#or) | `femininity` (female), `manliness` (male) | `humanity` |
| `fireman-firewoman` | [or](#or) | `firewoman` (female), `fireman` (male) | `fire fighter`, `fire officer` |
| `firemen-firewomen` | [or](#or) | `firewomen` (female), `firemen` (male) | `fire fighters` |
| `fisherman-fisherwoman` | [or](#or) | `fisherwoman` (female), `fisherman` (male) | `fisher`, `crew member`, `fisherfolk`, `angler` |
| `fishermen-fisherwomen` | [or](#or) | `fisherwomen` (female), `fishermen` (male) | `fishers` |
| `forefather-foremother` | [or](#or) | `foremother` (female), `forefather` (male) | `ancestor` |
| `forefathers-foremothers` | [or](#or) | `foremothers` (female), `forefathers` (male) | `ancestors` |
| `foreman-forewoman` | [or](#or) | `forewoman` (female), `foreman` (male) | `supervisor`, `shift boss` |
| `foremen-forewomen` | [or](#or) | `forewomen` (female), `foremen` (male) | `supervisors`, `shift bosses` |
| `founding-father` | [basic](#basic) | `founding father` | `the founders`, `founding leaders`, `forebears` |
| `frenchmen` | [basic](#basic) | `frenchmen` | `french`, `the french` |
| `freshman` | [basic](#basic) | `freshman`, `freshwoman` | `first-year student`, `fresher` |
| `freshmen-freshwomen` | [or](#or) | `freshwomen` (female), `freshmen` (male) | `first-year students`, `freshers` |
| `front-men,-frontmen-front-women,-frontwomen` | [or](#or) | `front women, frontwomen` (female), `front men, frontmen` (male) | `figureheads` |
| `frontman,-front-man-frontwoman,-front-woman` | [or](#or) | `frontwoman, front woman` (female), `frontman, front man` (male) | `lead`, `front`, `figurehead` |
| `gal-guy` | [or](#or) | `woman` (female), `gal` (female), `lady` (female), `babe` (female), `bimbo` (female), `chick` (female), `guy` (male), `lad` (male), `fellow` (male), `dude` (male), `bro` (male), `gentleman` (male) | `person`, `friend`, `pal`, `folk`, `individual` |
| `gals-man` | [or](#or) | `women` (female), `girls` (female), `gals` (female), `ladies` (female), `man` (male), `boys` (male), `men` (male), `guys` (male), `dudes` (male), `gents` (male), `gentlemen` (male) | `people`, `persons`, `folks` |
| `garbageman-garbagewoman` | [or](#or) | `garbagewoman` (female), `garbageman` (male) | `garbage collector`, `waste collector`, `trash collector` |
| `garbagemen-garbagewomen` | [or](#or) | `garbagewomen` (female), `garbagemen` (male) | `garbage collectors`, `waste collectors`, `trash collectors` |
| `gay-agenda` | [basic](#basic) | `gay agenda`, `homosexual agenda` | `gay issues` |
| `gay-lifestyle` | [basic](#basic) | `gay lifestyle`, `homosexual lifestyle` | `gay lives`, `gay/lesbian lives` |
| `gay-rights` | [basic](#basic) | `special rights`, `gay rights` | `equal rights`, `civil rights for gay people` |
| `gender-pronoun` | [basic](#basic) | `preferred pronoun`, `preferred pronouns`, `gender pronoun`, `gender pronouns` | `pronoun`, `pronouns` |
| `ghetto` | [basic](#basic) | `ghetto` | `projects`, `urban` |
| `godfather-godmother` | [or](#or) | `godmother` (female), `patroness` (female), `godfather` (male) | `godparent`, `elder`, `patron` |
| `goy` | [basic](#basic) | `goyim`, `goyum`, `goy` | `a person who is not Jewish`, `not Jewish` |
| `gramps-granny` | [or](#or) | `granny` (female), `grandma` (female), `grandmother` (female), `grandpappy` (male), `granddaddy` (male), `gramps` (male), `grandpa` (male), `grandfather` (male) | `grandparent`, `ancestor` |
| `granddaughter-grandson` | [or](#or) | `granddaughter` (female), `grandson` (male) | `grandchild` |
| `granddaughters-grandsons` | [or](#or) | `granddaughters` (female), `grandsons` (male) | `grandchildren` |
| `grandfather-clause` | [basic](#basic) | `grandfather clause`, `grandfather policy` | `legacy policy`, `legacy clause`, `deprecation policy` |
| `grandfathered` | [basic](#basic) | `grandfathered` | `deprecated`, `legacy` |
| `grandfathering` | [basic](#basic) | `grandfathering` | `deprecate` |
| `grandfathers-grandmothers` | [or](#or) | `grandmothers` (female), `grandfathers` (male) | `grandparents`, `ancestors` |
| `gyp` | [basic](#basic) | `gyppo`, `gypsy`, `Gipsy`, `gyp` | `Nomad`, `Traveler`, `Roma`, `Romani` |
| `handicapable` | [basic](#basic) | `person with a disability`, `disabled person`, `handicapable`, `differently abled`, `person living with a disability` | `cripple`, `handicapped`, `invalid`, `gimpy`, `broken` |
| `handyman-handywoman` | [or](#or) | `handywoman` (female), `craftswoman` (female), `handyman` (male), `craftsman` (male) | `artisan`, `craftsperson`, `skilled worker` |
| `handymen-handywomen` | [or](#or) | `handywomen` (female), `craftswomen` (female), `handymen` (male), `craftsmen` (male) | `artisans`, `craftspersons`, `skilled workers` |
| `hang` | [basic](#basic) | `hang`, `hanged` | `the app froze`, `the app stopped responding`, `the app stopped responding to events`, `the app became unresponsive` |
| `hangman-hangwoman` | [or](#or) | `hangwoman` (female), `hangman` (male) | `guillotine` |
| `hangmen-hangwomen` | [or](#or) | `hangwomen` (female), `hangmen` (male) | `guillotines` |
| `he-she` | [or](#or) | `she` (female), `he` (male), `she'd` (female), `he'd` (male), `she'll` (female), `he'll` (male), `she's` (female), `he's` (male) | `they`, `it` |
| `hearing-impaired` | [basic](#basic) | `hearing impaired`, `person with hearing loss` | `deaf`, `hard of hearing` |
| `henchman-henchwoman` | [or](#or) | `henchwoman` (female), `henchman` (male) | `sidekick` |
| `henchmen-henchwomen` | [or](#or) | `henchwomen` (female), `henchmen` (male) | `sidekicks` |
| `her-him` | [or](#or) | `her` (female), `hers` (female), `him` (male), `his` (male) | `their`, `theirs`, `them` |
| `hermaphrodite` | [basic](#basic) | `hermaphrodite`, `pseudohermaphrodite`, `pseudo hermaphrodite` | `person who is intersex`, `person`, `intersex person` |
| `hermaphroditic` | [basic](#basic) | `hermaphroditic`, `pseudohermaphroditic`, `pseudo hermaphroditic` | `intersex` |
| `hero-heroine` | [or](#or) | `heroine` (female), `hero` (male) | `role-model`, `mentor` |
| `heroes-heroines` | [or](#or) | `heroines` (female), `heroes` (male) | `role-models`, `mentor` |
| `herself-himself` | [or](#or) | `herself` (female), `himself` (male) | `themselves`, `theirself`, `self` |
| `heshe` | [basic](#basic) | `shemale`, `she male`, `heshe`, `shehe` | `transgender person`, `person` |
| `homosexual` | [basic](#basic) | `homosexual` | `gay`, `gay man`, `lesbian`, `gay person/people` |
| `homosexual-couple` | [basic](#basic) | `homosexual couple` | `couple` |
| `homosexual-marriage` | [basic](#basic) | `homosexual marriage` | `gay marriage`, `same-sex marriage` |
| `homosexual-relations` | [basic](#basic) | `homosexual relations`, `homosexual relationship` | `relationship` |
| `host-hostess` | [or](#or) | `hostess` (female), `host` (male) | `presenter`, `entertainer`, `emcee` |
| `hostesses-hosts` | [or](#or) | `hostesses` (female), `hosts` (male) | `presenters`, `entertainers`, `emcees` |
| `housemaid` | [basic](#basic) | `housemaid` | `house worker`, `domestic help` |
| `housewife` | [basic](#basic) | `housewife` | `homemaker`, `homeworker` |
| `housewives` | [basic](#basic) | `housewives` | `homemakers`, `homeworkers` |
| `husband-wife` | [or](#or) | `wife` (female), `husband` (male) | `partner`, `significant other`, `spouse` |
| `husbands-wives` | [or](#or) | `wives` (female), `husbands` (male) | `partners`, `significant others`, `spouses` |
| `hymie` | [basic](#basic) | `shlomo`, `shyster`, `hymie` | `Jewish person` |
| `indian-country` | [basic](#basic) | `Indian country` | `enemy territory` |
| `indian-give` | [basic](#basic) | `indian give`, `indian giver` | `go back on one’s offer` |
| `industrial-man` | [basic](#basic) | `industrial man` | `industrial civilization`, `industrial people` |
| `insurance-man-insurance-woman` | [or](#or) | `insurance woman` (female), `insurance man` (male) | `insurance agent` |
| `insurance-men-insurance-women` | [or](#or) | `insurance women` (female), `insurance men` (male) | `insurance agents` |
| `intellectually-disabled-person` | [basic](#basic) | `person with an intellectual disability`, `intellectually disabled person`, `individual with cognitive impairments` | `moron`, `idiot`, `imbecile`, `dimwit`, `thick` |
| `islamist` | [basic](#basic) | `islamist` | `muslim`, `person of Islamic faith`, `fanatic`, `zealot`, `follower of islam`, `follower of the islamic faith` |
| `islamists` | [basic](#basic) | `islamists` | `muslims`, `people of Islamic faith`, `fanatics`, `zealots` |
| `janitor-janitress` | [or](#or) | `cleaning lady` (female), `cleaning girl` (female), `cleaning woman` (female), `janitress` (female), `cleaning man` (male), `cleaning boy` (male), `janitor` (male) | `cleaner` |
| `janitors-janitresses` | [or](#or) | `cleaning ladies` (female), `cleaning girls` (female), `janitresses` (female), `cleaning men` (male), `janitors` (male) | `cleaners`, `housekeeping` |
| `japs` | [basic](#basic) | `japs` | `Japanese person`, `Japanese people` |
| `journeyman-journeywoman` | [or](#or) | `journeywoman` (female), `journeyman` (male) | `journeyperson` |
| `journeymen-journeywomen` | [or](#or) | `journeywomen` (female), `journeymen` (male) | `journeypersons` |
| `just` | [basic](#basic) | `just` | |
| `king-queen` | [or](#or) | `empress` (female), `queen` (female), `emperor` (male), `king` (male) | `ruler` |
| `kingmaker-queenmaker` | [or](#or) | `queenmaker` (female), `kingmaker` (male) | `power behind the throne` |
| `kings-queens` | [or](#or) | `empresses` (female), `queens` (female), `emperors` (male), `kings` (male) | `rulers` |
| `kingsize-queensize` | [or](#or) | `queensize` (female), `kingsize` (male) | `jumbo`, `gigantic` |
| `lady-doctor` | [basic](#basic) | `lady doctor` | `doctor` |
| `ladylike` | [basic](#basic) | `ladylike` | `courteous`, `cultured` |
| `landladies-landlords` | [or](#or) | `landladies` (female), `landlords` (male) | `proprietors`, `building managers` |
| `landlady-landlord` | [or](#or) | `landlady` (female), `landlord` (male) | `proprietor`, `building manager` |
| `latino` | [basic](#basic) | `latino`, `latina` | `Latinx` |
| `layman-laywoman` | [or](#or) | `laywoman` (female), `layman` (male) | `civilian` |
| `laymen-laywomen` | [or](#or) | `laywomen` (female), `laymen` (male) | `civilians` |
| `leading-lady` | [basic](#basic) | `leading lady` | `lead` |
| `learningdisabled-person` | [basic](#basic) | `person with a learning disability`, `learningdisabled person` | `slow learner`, `dull`, `backward` |
| `like-a-man` | [basic](#basic) | `like a man` | `resolutely`, `bravely` |
| `limping-person` | [basic](#basic) | `person with a limp`, `limping person` | `lame`, `gimp`, `hobbly`, `crook-leg` |
| `long-time-no-see` | [basic](#basic) | `long time no hear`, `long time no see` | `I haven’t seen you in a long time`, `it’s been a long time` |
| `madman` | [basic](#basic) | `madman`, `mad man` | `fanatic`, `zealot`, `enthusiast` |
| `madmen` | [basic](#basic) | `madmen`, `mad men` | `fanatics`, `zealots`, `enthusiasts` |
| `maiden` | [basic](#basic) | `maiden` | `virgin` |
| `maiden-flight` | [basic](#basic) | `maiden flight` | `first flight` |
| `maiden-name` | [basic](#basic) | `maiden name` | `birth name` |
| `maiden-race` | [basic](#basic) | `maiden race` | `first race` |
| `maiden-speech` | [basic](#basic) | `maiden speech` | `first speech` |
| `maiden-voyage` | [basic](#basic) | `maiden voyage` | `first voyage` |
| `make-*-great-again` | [basic](#basic) | `make * great again`, `make * * great again`, `make * * * great again`, `make * * * * great again`, `make * * * * * great again` | `improve` |
| `man-a-desk` | [basic](#basic) | `man a desk` | `staff a desk` |
| `man-enough` | [basic](#basic) | `man enough` | `strong enough` |
| `man-in-the-street` | [basic](#basic) | `man in the street` | `ordinary citizen`, `typical person`, `average person` |
| `man-of-action` | [basic](#basic) | `man of action` | `dynamo` |
| `man-of-letters` | [basic](#basic) | `man of letters` | `scholar`, `writer`, `literary figure` |
| `man-of-the-land` | [basic](#basic) | `man of the land` | `farmer`, `rural worker`, `grazier`, `landowner`, `rural community`, `country people`, `country folk` |
| `man-of-the-world` | [basic](#basic) | `man of the world` | `sophisticate` |
| `man-the-booth` | [basic](#basic) | `man the booth` | `staff the booth` |
| `man-the-fort` | [basic](#basic) | `man the fort` | `keep an eye on things`, `keep shop`, `provide coverage`, `cover things`, `take charge` |
| `man-the-phones` | [basic](#basic) | `man the phones` | `answer the phones` |
| `manhood-womanhood` | [or](#or) | `womanhood` (female), `masculinity` (male), `manhood` (male) | `adulthood`, `personhood`, `maturity` |
| `manhour` | [basic](#basic) | `manhour`, `man hour` | `staff hour`, `hour of work` |
| `manhours` | [basic](#basic) | `manhours`, `man hours` | `staff hours`, `hours of work`, `hours of labor`, `hours` |
| `mankind` | [basic](#basic) | `mankind` | `humankind` |
| `manmade` | [basic](#basic) | `manmade` | `manufactured`, `artificial`, `synthetic`, `machine-made`, `constructed` |
| `manned` | [basic](#basic) | `manned` | `staffed`, `crewed`, `piloted` |
| `manpower` | [basic](#basic) | `manpower` | `human resources`, `workforce`, `personnel`, `staff`, `labor`, `labor force`, `staffing`, `combat personnel` |
| `mans-best-friend` | [basic](#basic) | `mans best friend` | `a faithful dog` |
| `mansized-task` | [basic](#basic) | `mansized task`, `man sized task` | `a demanding task`, `a big job` |
| `marksman-markswoman` | [or](#or) | `markswoman` (female), `marksman` (male) | `shooter` |
| `marksmen-markswomen` | [or](#or) | `markswomen` (female), `marksmen` (male) | `shooters` |
| `master` | [basic](#basic) | `master` | `primary`, `lead`, `hub`, `reference` |
| `master-key` | [basic](#basic) | `master key`, `master copy` | `pass key`, `original` |
| `master-of-ceremonies` | [basic](#basic) | `master of ceremonies` | `emcee`, `moderator`, `convenor` |
| `master-plan` | [basic](#basic) | `master plan` | `grand scheme`, `guiding principles` |
| `master-the-art` | [basic](#basic) | `master the art` | `become skilled` |
| `masterful` | [basic](#basic) | `masterful` | `skilled`, `authoritative`, `commanding` |
| `mastermind` | [basic](#basic) | `mastermind` | `genius`, `creator`, `instigator`, `oversee`, `launch`, `originate` |
| `masterpiece` | [basic](#basic) | `masterpiece` | `work of genius`, `chef d’oeuvre` |
| `masterplan` | [basic](#basic) | `masterplan` | `vision`, `comprehensive plan` |
| `masters` | [basic](#basic) | `masters` | `primaries`, `hubs`, `references` |
| `masterstroke` | [basic](#basic) | `masterstroke` | `trump card`, `stroke of genius` |
| `maternal-paternal` | [or](#or) | `maternal` (female), `paternal` (male), `fraternal` (male) | `parental`, `warm`, `intimate` |
| `maternity-paternity` | [or](#or) | `maternity` (female), `paternity` (male) | `parental` |
| `men-of-science` | [basic](#basic) | `men of science` | `scientists` |
| `mentally-ill-person` | [basic](#basic) | `person with mental illness`, `mentally ill person`, `individual with mental health issues`, `person with symptoms of mental illness` | `psycho`, `crazy`, `lunatic`, `madman`, `nutcase`, `whacko` |
| `middleman-middlewoman` | [or](#or) | `middlewoman` (female), `middleman` (male) | `intermediary`, `go-between` |
| `middlemen-middlewomen` | [or](#or) | `middlewomen` (female), `middlemen` (male) | `intermediaries`, `go-betweens` |
| `midwife` | [basic](#basic) | `midwife` | `birthing nurse` |
| `milkman-milkwoman` | [or](#or) | `milkwoman` (female), `milkman` (male) | `milk person` |
| `milkmen-milkwomen` | [or](#or) | `milkwomen` (female), `milkmen` (male) | `milk people` |
| `moan` | [basic](#basic) | `bitch`, `moan` | `whine`, `complain`, `cry` |
| `moaning` | [basic](#basic) | `bitching`, `moaning` | `whining`, `complaining`, `crying` |
| `mobility-challenged` | [basic](#basic) | `mobility challenged`, `person with mobility issues` | `stiff`, `clunky`, `immobile` |
| `modern-man` | [basic](#basic) | `modern man` | `modern civilization`, `modern people` |
| `motherly` | [basic](#basic) | `motherly` | `loving`, `warm`, `nurturing` |
| `mrs-` | [basic](#basic) | `miss.`, `mrs.` | `ms.` |
| `natives-are-restless` | [basic](#basic) | `natives are restless`, `natives are becoming restless`, `natives are getting restless`, `natives are growing restless` | `dissatisfied`, `frustrated` |
| `nephew-niece` | [or](#or) | `niece` (female), `nephew` (male) | `nibling`, `sibling’s child` |
| `nephews-nieces` | [or](#or) | `nieces` (female), `nephews` (male) | `niblings`, `sibling’s children` |
| `neurodiverse` | [basic](#basic) | `neurodiverse`, `neuroatypical` | `weird`, `odd`, `eccentric` |
| `newsman-newswoman` | [or](#or) | `newswoman` (female), `newspaperwoman` (female), `anchorwoman` (female), `newsman` (male), `newspaperman` (male), `anchorman` (male) | `anchor`, `journalist` |
| `newsmen-newswomen` | [or](#or) | `newswomen` (female), `newspaperwomen` (female), `anchorwomen` (female), `newsmen` (male), `newspapermen` (male), `anchormen` (male) | `anchors`, `journalists` |
| `no-mans-land` | [basic](#basic) | `no mans land` | `unoccupied territory`, `wasteland`, `deathtrap` |
| `nobleman-noblewoman` | [or](#or) | `noblewoman` (female), `nobleman` (male) | `noble` |
| `noblemen-noblewomen` | [or](#or) | `noblewomen` (female), `noblemen` (male) | `nobles` |
| `nonwhite` | [basic](#basic) | `nonwhite`, `non white` | `person of color`, `people of color` |
| `obvious` | [basic](#basic) | `obvious`, `obviously` | |
| `of-course` | [basic](#basic) | `of course` | |
| `off-reserve` | [basic](#basic) | `jump the reservation`, `off reserve`, `off the reservation` | `disobey`, `endure`, `object to`, `oppose`, `resist` |
| `office-girls` | [basic](#basic) | `office girls` | `administrative staff` |
| `ombudsman-ombudswoman` | [or](#or) | `ombudswoman` (female), `ombudsman` (male) | `notary`, `consumer advocate`, `trouble shooter`, `omsbudperson`, `mediator` |
| `ombudsmen-ombudswomen` | [or](#or) | `ombudswomen` (female), `ombudsmen` (male) | `notaries`, `omsbudpersons`, `omsbudpeople`, `mediators` |
| `on-the-warpath` | [basic](#basic) | `circle the wagons`, `on the warpath` | `defend` |
| `oneupmanship` | [basic](#basic) | `oneupmanship` | `upstaging`, `competitiveness` |
| `oriental` | [basic](#basic) | `oriental` | `Asian person` |
| `orientals` | [basic](#basic) | `orientals` | `Asian people` |
| `own-man-own-woman` | [or](#or) | `own woman` (female), `own man` (male) | `own person` |
| `pinoys` | [basic](#basic) | `pinoys`, `pinays` | `Filipinos`, `Filipino people` |
| `poetess` | [basic](#basic) | `poetess` | `poet` |
| `policemen-policewomen` | [or](#or) | `policewomen` (female), `policemen` (male) | `officers`, `police officers` |
| `postman-postwoman` | [or](#or) | `postwoman` (female), `mailwoman` (female), `postman` (male), `mailman` (male) | `mail carrier`, `letter carrier`, `postal worker` |
| `postmen-postwomen` | [or](#or) | `postwomen` (female), `mailwomen` (female), `postmen` (male), `mailmen` (male) | `mail carriers`, `letter carriers`, `postal workers` |
| `powwow` | [basic](#basic) | `pow wow`, `powwow` | `conference`, `gathering`, `meeting` |
| `prince-princess` | [or](#or) | `princess` (female), `prince` (male) | `heir` |
| `princes-princesses` | [or](#or) | `princesses` (female), `princes` (male) | `heirs` |
| `pull-the-trigger` | [basic](#basic) | `pull the trigger` | `go for it`, `take a chance`, `make a move`, `take action` |
| `railwayman` | [basic](#basic) | `railwayman` | `railway worker` |
| `redskin` | [basic](#basic) | `red indian`, `pocahontas`, `redskin` | `Native American` |
| `redskins` | [basic](#basic) | `red indians`, `redskins` | `Native American People` |
| `repairman-repairwoman` | [or](#or) | `repairwoman` (female), `repairman` (male) | `repairer`, `technician` |
| `repairmen-repairwomen` | [or](#or) | `repairwomen` (female), `repairmen` (male) | `technicians` |
| `salaryman-salarywoman` | [or](#or) | `businesswoman` (female), `salarywoman` (female), `businessman` (male), `salaryman` (male) | `business executive`, `entrepreneur`, `business person`, `professional` |
| `salarymen-salarywomen` | [or](#or) | `businesswomen` (female), `salarywomen` (female), `career girl` (female), `career woman` (female), `businessmen` (male), `salarymen` (male) | `business executives`, `entrepreneurs` |
| `saleslady-salesman` | [or](#or) | `saleswoman` (female), `sales woman` (female), `saleslady` (female), `salesman` (male), `sales man` (male) | `salesperson`, `sales clerk`, `sales rep`, `sales agent`, `sales attendant`, `seller`, `shop assistant` |
| `salesmen-saleswomen` | [or](#or) | `saleswomen` (female), `sales women` (female), `salesladies` (female), `salesmen` (male), `sales men` (male) | `sales clerks`, `sales reps`, `sales agents`, `sellers` |
| `sandman-sandwoman` | [or](#or) | `sandwoman` (female), `sandman` (male) | `fairy` |
| `sandmen-sandwomen` | [or](#or) | `sandwomen` (female), `sandmen` (male) | `fairies` |
| `savage` | [basic](#basic) | `primitive`, `savage`, `stone age` | `simple`, `indigenous`, `hunter-gatherer` |
| `serviceman-servicewoman` | [or](#or) | `servicewoman` (female), `serviceman` (male) | `soldier`, `service representative` |
| `servicemen-servicewomen` | [or](#or) | `servicewomen` (female), `servicemen` (male) | `soldiers`, `service representatives` |
| `sex-change-operation` | [basic](#basic) | `sex change operation` | `sex reassignment surgery`, `gender confirmation surgery` |
| `sexchange` | [basic](#basic) | `sexchange`, `sex change` | `transition`, `gender confirmation surgery` |
| `sexual-preference` | [basic](#basic) | `sexual preference` | `sexual orientation`, `orientation` |
| `showman-showwoman` | [or](#or) | `showwoman` (female), `showman` (male) | `promoter` |
| `showmen-showwomen` | [or](#or) | `showwomen` (female), `show women` (female), `showmen` (male) | `promoters` |
| `simple` | [basic](#basic) | `simple`, `simply` | |
| `slave` | [basic](#basic) | `slave` | `secondary`, `worker`, `replica`, `node` |
| `slaves` | [basic](#basic) | `slaves` | `secondaries`, `workers`, `replicas`, `nodes` |
| `sophisticated-culture` | [basic](#basic) | `sophisticated culture` | `complex culture` |
| `sophisticated-technology` | [basic](#basic) | `sophisticated technology` | `complex technology` |
| `spaceman-spacewoman` | [or](#or) | `spacewoman` (female), `spaceman` (male) | `astronaut` |
| `spacemen-spacewomen` | [or](#or) | `spacewomen` (female), `spacemen` (male) | `astronauts` |
| `spade` | [basic](#basic) | `spade` | `a Black person` |
| `speechimpaired-person` | [basic](#basic) | `person with a speech impairment`, `speechimpaired person` | `dumb`, `mute`, `stutterer`, `mumbler` |
| `spokesman-spokeswoman` | [or](#or) | `spokeswoman` (female), `spokesman` (male) | `speaker`, `spokesperson`, `representative` |
| `spokesmen-spokeswomen` | [or](#or) | `spokeswomen` (female), `spokesmen` (male) | `speakers`, `spokespersons` |
| `sportsman-sportswoman` | [or](#or) | `sportswoman` (female), `sportsman` (male) | `athlete`, `sports person` |
| `sportsmanlike` | [basic](#basic) | `sportsmanlike` | `fair`, `sporting` |
| `sportsmanship` | [basic](#basic) | `sportsmanship` | `fairness`, `good humor`, `sense of fair play` |
| `sportsmen-sportswomen` | [or](#or) | `sportswomen` (female), `sportsmen` (male) | `athletes`, `sports persons` |
| `statesman-stateswoman` | [or](#or) | `stateswoman` (female), `statesman` (male) | `senator` |
| `statesmanlike` | [basic](#basic) | `statesmanlike`, `statesman like` | `diplomatic` |
| `stepbrother-stepsister` | [or](#or) | `stepsister` (female), `stepbrother` (male) | `step-sibling` |
| `stepbrothers-stepsisters` | [or](#or) | `stepsisters` (female), `stepbrothers` (male) | `step-siblings` |
| `stepdad-stepmom` | [or](#or) | `stepmom` (female), `stepmother` (female), `stepdad` (male), `stepfather` (male) | `step-parent` |
| `stepfathers-stepmothers` | [or](#or) | `stepmothers` (female), `stepfathers` (male) | `step-parents` |
| `steward-stewardess` | [or](#or) | `stewardess` (female), `steward` (male) | `flight attendant` |
| `stewardesses-stewards` | [or](#or) | `stewardesses` (female), `stewards` (male) | `flight attendants` |
| `stockman` | [basic](#basic) | `stockman` | `cattle worker`, `farmhand`, `drover` |
| `straightforward` | [basic](#basic) | `straight forward`, `straightforward`, `straight forwardly`, `straightforwardly` | |
| `suicide-note` | [basic](#basic) | `suicide note` | `a note from the deceased` |
| `suicide-pact` | [basic](#basic) | `suicide epidemic`, `epidemic of suicides`, `suicide pact` | `rise in suicides` |
| `superman-superwoman` | [or](#or) | `superwoman` (female), `superman` (male) | `titan` |
| `supermen-superwomen` | [or](#or) | `superwomen` (female), `supermen` (male) | `titans` |
| `tax-man` | [basic](#basic) | `tax man` | `tax commissioner`, `tax office`, `tax collector` |
| `too-many-chiefs` | [basic](#basic) | `too many chiefs` | `too many chefs in the kitchen`, `too many cooks spoil the broth` |
| `totem` | [basic](#basic) | `animal spirit`, `dream catcher`, `spirit animal`, `totem` | `favorite`, `inspiration`, `personal interest`, `personality type` |
| `towel-heads` | [basic](#basic) | `towel heads` | `Arabs`, `Middle Eastern People` |
| `tradesmans-entrance` | [basic](#basic) | `tradesmans entrance` | `service entrance` |
| `tranny` | [basic](#basic) | `tranny` | `transgender` |
| `transgendered` | [basic](#basic) | `transgendered` | `transgender` |
| `transgenderism` | [basic](#basic) | `transgenderism` | `being transgender`, `the movement for transgender equality` |
| `transgenders` | [basic](#basic) | `transgenders` | `transgender people` |
| `transvestite` | [basic](#basic) | `transvestite` | `cross-dresser` |
| `tribe` | [basic](#basic) | `tribe` | `society`, `community` |
| `unmanly-unwomanly` | [or](#or) | `unwomanly` (female), `unwomenly` (female), `unmanly` (male), `unmenly` (male) | `inhumane` |
| `unmanned` | [basic](#basic) | `unmanned` | `robotic`, `automated` |
| `usherette` | [basic](#basic) | `usherette` | `usher` |
| `visually-impaired` | [basic](#basic) | `visually impaired`, `person with vision loss` | `blind`, `sightless` |
| `waiter-waitress` | [or](#or) | `waitress` (female), `waiter` (male) | `server` |
| `waiters-waitresses` | [or](#or) | `waitresses` (female), `waiters` (male) | `servers` |
| `watchman-watchwoman` | [or](#or) | `watchwoman` (female), `watchman` (male) | `watcher` |
| `watchmen-watchwomen` | [or](#or) | `watchwomen` (female), `watchmen` (male) | `watchers` |
| `weatherman-weatherwoman` | [or](#or) | `weatherwoman` (female), `weatherman` (male) | `weather forecaster`, `meteorologist` |
| `weathermen-weatherwomen` | [or](#or) | `weatherwomen` (female), `weathermen` (male) | `weather forecasters`, `meteorologists` |
| `whitehat` | [basic](#basic) | `whitehat` | `ethical hacker`, `security researcher` |
| `whitelist` | [basic](#basic) | `whitelist`, `white list` | `passlist`, `alrightlist`, `safelist`, `allow list` |
| `whitelisted` | [basic](#basic) | `whitelisted` | `passlisted`, `alrightlisted`, `safelisted`, `allow-listed` |
| `whitelisting` | [basic](#basic) | `whitelisting` | `passlisting`, `alrightlisting`, `safelisting`, `allow-listing` |
| `widow-widower` | [or](#or) | `widow` (female), `widows` (female), `widower` (male), `widowers` (male) | `bereaved` |
| `wifebeater` | [basic](#basic) | `wife beater`, `wifebeater` | `tank top`, `sleeveless undershirt` |
| `woman-lawyer` | [basic](#basic) | `woman lawyer` | `lawyer` |
| `woman-painter` | [basic](#basic) | `woman painter` | `painter` |
| `working-wife` | [basic](#basic) | `working mother`, `working wife` | `wage or salary earning woman`, `two-income family` |
| `workman-workwoman` | [or](#or) | `workwoman` (female), `working woman` (female), `workman` (male), `working man` (male) | `worker`, `wage earner`, `taxpayer` |
| `workmanship` | [basic](#basic) | `workmanship` | `quality construction`, `expertise` |
| `workmen-workwomen` | [or](#or) | `workwomen` (female), `workmen` (male) | `workers` |
