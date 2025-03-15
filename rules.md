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
| `a-big-job` | [basic](#basic) | `a demanding task`, `a big job` | `mansized task`, `man sized task` |
| `a-faithful-dog` | [basic](#basic) | `a faithful dog` | `mans best friend` |
| `ancestor` | [basic](#basic) | `ancestor` | `foremother`, `forefather` |
| `ancestors` | [basic](#basic) | `ancestors` | `foremothers`, `forefathers` |
| `anchor` | [basic](#basic) | `anchor`, `journalist` | `propagandist`, `newswoman`, `newspaperwoman`, `anchorwoman`, `newsman`, `newspaperman`, `anchorman` |
| `anchors` | [basic](#basic) | `anchors`, `journalists` | `propagandists`, `newswomen`, `newspaperwomen`, `anchorwomen`, `newsmen`, `newspapermen`, `anchormen` |
| `ancient-people` | [basic](#basic) | `ancient civilization`, `ancient people` | `ancient man` |
| `answer-the-phones` | [basic](#basic) | `answer the phones` | `man the phones` |
| `artisan` | [basic](#basic) | `artisan`, `craftsperson`, `skilled worker` | `handywoman`, `craftswoman`, `handyman`, `craftsman` |
| `artisans` | [basic](#basic) | `artisans`, `craftspersons`, `skilled workers` | `handywomen`, `craftswomen`, `handymen`, `craftsmen` |
| `assembly-person` | [basic](#basic) | `assembly person`, `assembly worker` | `assemblywoman`, `assemblyman` |
| `assigned-female-at-birth` | [basic](#basic) | `assigned female at birth`, `designated female at birth` | `biologically female`, `born a woman`, `genetically female` |
| `assigned-male-at-birth` | [basic](#basic) | `assigned male at birth`, `designated male at birth` | `biologically male`, `born a man`, `genetically male` |
| `astronaut` | [basic](#basic) | `astronaut` | `spacewoman`, `spaceman` |
| `astronauts` | [basic](#basic) | `astronauts` | `spacewomen`, `spacemen` |
| `athlete` | [basic](#basic) | `athlete`, `sports person` | `sportswoman`, `sportsman` |
| `athletes` | [basic](#basic) | `athletes`, `sports persons` | `sportswomen`, `sportsmen` |
| `average-consumer` | [basic](#basic) | `average consumer`, `average household`, `average homemaker` | `average housewife` |
| `average-person` | [basic](#basic) | `average person`, `ordinary citizen`, `typical person` | `average man`, `man in the street` |
| `average-taxpayer` | [basic](#basic) | `average wage earner`, `average taxpayer` | `average working man` |
| `become-skilled` | [basic](#basic) | `become skilled` | `master the art` |
| `bereaved` | [basic](#basic) | `bereaved` | `widow`, `widows`, `widower`, `widowers` |
| `birth-name` | [basic](#basic) | `birth name` | `maiden name`, `surname` |
| `birthing-nurse` | [basic](#basic) | `birthing nurse` | `midwife` |
| `birthing-people` | [basic](#basic) | `birthing people` | `women` |
| `birthing-person` | [basic](#basic) | `birthing person` | `woman` |
| `bisexual` | [basic](#basic) | `bisexual` | `bi` |
| `blackhat` | [basic](#basic) | `blackhat` | `unethical hacker`, `malicious actor` |
| `blacklist` | [basic](#basic) | `blacklist`, `black list` | `blocklist`, `wronglist`, `banlist`, `deny list` |
| `blacklisted` | [basic](#basic) | `blacklisted` | `blocklisted`, `wronglisted`, `banlisted`, `deny-listed` |
| `blacklisting` | [basic](#basic) | `blacklisting` | `blocklisting`, `wronglisting`, `banlisting`, `deny-listing` |
| `bogeymonster` | [basic](#basic) | `bogeymonster` | `bogeywoman`, `bogeyman`, `bogiewoman`, `bogieman`, `bogiewomen`, `bogiemen` |
| `bonder` | [basic](#basic) | `bonder` | `bondswoman`, `bondsman` |
| `bonders` | [basic](#basic) | `bonders` | `bondswomen`, `bondsmen` |
| `boogeymonster` | [basic](#basic) | `boogeymonster` | `boogeywoman`, `boogeyman`, `boogiewoman`, `boogieman` |
| `boogeymonsters` | [basic](#basic) | `boogeymonsters` | `boogiewomen`, `boogiemen` |
| `bravely` | [basic](#basic) | `resolutely`, `bravely` | `like a man` |
| `bugreport` | [basic](#basic) | `bugreport` | `bug report`, `snapshot` |
| `cabinet` | [basic](#basic) | `cabinet`, `cabinet members`, `alderperson` | `alderwomen`, `aldermen` |
| `cabinet-member` | [basic](#basic) | `cabinet member` | `alderwoman`, `alderman` |
| `camaraderie` | [basic](#basic) | `camaraderie`, `organization` | `fellowship` |
| `camera-operators` | [basic](#basic) | `camera operators` | `camerawomen`, `cameramen` |
| `camera-person` | [basic](#basic) | `camera operator`, `camera person` | `camerawoman`, `cameraman` |
| `cattle-rancher` | [basic](#basic) | `cattle rancher` | `cattlewoman`, `cattleman` |
| `cattle-ranchers` | [basic](#basic) | `cattle ranchers` | `cattlewomen`, `cattlemen` |
| `chairs` | [basic](#basic) | `chairs`, `chairpersons`, `coordinators` | `chairwomen`, `chairmen` |
| `chef-d’oeuvre` | [basic](#basic) | `work of genius`, `chef d’oeuvre` | `masterpiece` |
| `chiefs` | [basic](#basic) | `officials`, `chiefs` | `dames`, `lords` |
| `child` | [basic](#basic) | `child` | `daughter`, `son` |
| `childhood` | [basic](#basic) | `childhood` | `girlhood`, `boyhood` |
| `childish` | [basic](#basic) | `childish` | `girly`, `girlish`, `boyish` |
| `children` | [basic](#basic) | `children` | `daughters`, `sons` |
| `cleaner` | [basic](#basic) | `cleaner` | `cleaning lady`, `cleaning girl`, `cleaning woman`, `cleaning man`, `cleaning boy`, `janitor` |
| `cleaners` | [basic](#basic) | `cleaners`, `housekeeping` | `cleaning ladies`, `cleaning girls`, `cleaning men`, `janitors` |
| `clergy` | [basic](#basic) | `clergyperson`, `clergy`, `cleric`, `practicing christian` | `clergywoman`, `clergyman`, `churchman`, `christian` |
| `clerics` | [basic](#basic) | `clergies`, `clerics` | `clergywomen`, `clergymen` |
| `cognitively-impaired` | [basic](#basic) | `cognitively impaired`, `person with cognitive disabilities` | `dimwit`, `thick`, `slow-witted` |
| `commit-suicide` | [basic](#basic) | `commit suicide`, `complete suicide`, `successful suicide` | `die by suicide` |
| `committed-suicide` | [basic](#basic) | `committed suicide`, `completed suicide` | `died by suicide` |
| `committee-member` | [basic](#basic) | `committee member` | `committee woman`, `committee man` |
| `common-person` | [basic](#basic) | `common person` | `common girl`, `common woman`, `comomon boy`, `common man` |
| `concierge` | [basic](#basic) | `concierge` | `doorwoman`, `doorman` |
| `concierges` | [basic](#basic) | `concierges` | `doorwomen`, `doormen` |
| `convenor` | [basic](#basic) | `convenor` | `master of ceremonies` |
| `council-member` | [basic](#basic) | `council member` | `councilwoman`, `councilman` |
| `council-members` | [basic](#basic) | `council members` | `councilwomen`, `councilmen` |
| `country-folk` | [basic](#basic) | `country folk` | `countrywomen`, `countrymen` |
| `country-person` | [basic](#basic) | `country person` | `countrywoman`, `countryman` |
| `courier` | [basic](#basic) | `courier`, `messenger` | `delivery girl`, `delivery boy` |
| `cowhand` | [basic](#basic) | `cowhand` | `cowgirl`, `cowboy` |
| `cowhands` | [basic](#basic) | `cowhands` | `cowgirls`, `cowboys` |
| `crewed` | [basic](#basic) | `staffed`, `crewed`, `piloted` | `manned` |
| `crossdresser` | [basic](#basic) | `crossdresser` | `transvestite` |
| `cry` | [basic](#basic) | `whine`, `complain`, `cry` | `bitch`, `moan` |
| `crying` | [basic](#basic) | `whining`, `complaining`, `crying` | `bitching`, `moaning` |
| `cultured` | [basic](#basic) | `courteous`, `cultured` | `ladylike` |
| `developmentally-delayed` | [basic](#basic) | `person with developmental disabilities`, `developmentally disabled person`, `individual with developmental challenges`, `developmentally delayed`, `person with developmental delays` | `retard`, `slow`, `simple`, `backward`, `dull` |
| `diplomatic` | [basic](#basic) | `diplomatic` | `statesmanlike`, `statesman like` |
| `diversity-training` | [basic](#basic) | `diversity training` | |
| `drover` | [basic](#basic) | `cattle worker`, `farmhand`, `drover` | `stockman` |
| `dynamo` | [basic](#basic) | `dynamo` | `man of action` |
| `emcee` | [basic](#basic) | `presenter`, `emcee` | `hostess`, `host` |
| `emcees` | [basic](#basic) | `presenters`, `emcees` | `hostesses`, `hosts` |
| `emotionally-disturbed` | [basic](#basic) | `emotionally disturbed`, `person with emotional issues` | `unhinged`, `wreck`, `basket case` |
| `english-coordinator` | [basic](#basic) | `english coordinator`, `senior teacher of english` | `english master` |
| `entrepreneur` | [basic](#basic) | `business executive`, `entrepreneur`, `business person`, `professional` | `businesswoman`, `salarywoman`, `businessman`, `bossman` |
| `entrepreneurs` | [basic](#basic) | `business executives`, `entrepreneurs` | `businesswomen`, `salarywomen`, `career girl`, `career woman`, `businessmen`, `bossmen` |
| `equal-rights` | [basic](#basic) | `equal rights`, `civil rights for gay people` | `special rights`, `gay rights` |
| `escort` | [basic](#basic) | `escort`, `prostitute`, `sex worker` | `call girl` |
| `eskimo` | [basic](#basic) | `eskimo` | `Inuit` |
| `eskimos` | [basic](#basic) | `eskimos` | `Inuits` |
| `expertise` | [basic](#basic) | `quality construction`, `expertise` | `workmanship` |
| `failed-suicide` | [basic](#basic) | `failed suicide`, `failed attempt`, `suicide failure` | `suicide attempt`, `attempted suicide` |
| `fair` | [basic](#basic) | `fair`, `sporting` | `sportsmanlike` |
| `fairness` | [basic](#basic) | `fairness`, `sense of fair play` | `sportsmanship` |
| `farmer` | [basic](#basic) | `farmer`, `rural worker`, `grazier`, `landowner` | `man of the land` |
| `figureheads` | [basic](#basic) | `figureheads` | `front women`, `frontwomen`, `front men`, `frontmen` |
| `fire-fighter` | [basic](#basic) | `fire fighter`, `fire officer` | `firewoman`, `fireman` |
| `fire-fighters` | [basic](#basic) | `fire fighters` | `firewomen`, `firemen` |
| `first-flight` | [basic](#basic) | `first flight` | `maiden flight` |
| `first-voyage` | [basic](#basic) | `first voyage` | `maiden voyage` |
| `fisher` | [basic](#basic) | `fisher`, `crew member`, `fisherfolk`, `angler` | `fisherwoman`, `fisherman` |
| `fishers` | [basic](#basic) | `fishers` | `fisherwomen`, `fishermen` |
| `flight-attendant` | [basic](#basic) | `flight attendant` | `stewardess`, `steward` |
| `flight-attendants` | [basic](#basic) | `flight attendants` | `stewardesses`, `stewards` |
| `folks` | [basic](#basic) | `people`, `persons`, `folks` | `women`, `girls`, `gals`, `ladies`, `man`, `boys`, `men`, `guys`, `dudes`, `gents`, `gentlemen` |
| `forebears` | [basic](#basic) | `the founders`, `founding leaders`, `forebears` | `founding fathers` |
| `founder-of` | [basic](#basic) | `founder of`, `founding leader` | `father of *`, `founding father` |
| `french` | [basic](#basic) | `french`, `the french` | `frenchmen` |
| `fresher` | [basic](#basic) | `firstyear student`, `fresher` | `freshman`, `freshwoman` |
| `freshers` | [basic](#basic) | `firstyear students`, `freshers` | `freshwomen`, `freshmen` |
| `gay` | [basic](#basic) | `gay`, `gay man`, `lesbian`, `gay person`, `gay people` | `fag`, `faggot`, `dyke`, `homo`, `sodomite` |
| `gay-issues` | [basic](#basic) | `gay issues` | `gay agenda`, `homosexual agenda` |
| `gay-lives` | [basic](#basic) | `gay lives`, `gay/lesbian lives` | `gay lifestyle`, `homosexual lifestyle` |
| `gay-marriage` | [basic](#basic) | `gay marriage`, `samesex marriage` | `homosexual marriage` |
| `gender-expression` | [basic](#basic) | `gender expression` | `femininity`, `manliness` |
| `ghetto` | [basic](#basic) | `ghetto` | `projects`, `urban` |
| `gobetween` | [basic](#basic) | `intermediary`, `gobetween` | `middlewoman`, `middleman` |
| `gobetweens` | [basic](#basic) | `intermediaries`, `gobetweens` | `middlewomen`, `middlemen` |
| `godparent` | [basic](#basic) | `godparent` | `godmother`, `patroness`, `godfather` |
| `goy` | [basic](#basic) | `goyim`, `goyum`, `goy` | `a person who is not Jewish`, `not Jewish` |
| `graduate` | [basic](#basic) | `graduate` | `alumna`, `alumnus` |
| `graduates` | [basic](#basic) | `graduates` | `alumnae`, `alumni` |
| `grand-scheme` | [basic](#basic) | `grand scheme`, `guiding principles` | `master plan` |
| `grandchild` | [basic](#basic) | `grandchild` | `granddaughter`, `grandson` |
| `grandchildren` | [basic](#basic) | `grandchildren` | `granddaughters`, `grandsons` |
| `grandfather-clause` | [basic](#basic) | `grandfather clause`, `grandfather policy` | `legacy policy`, `legacy clause`, `deprecation policy` |
| `grandfathered` | [basic](#basic) | `grandfathered` | `deprecated`, `legacy` |
| `grandfathering` | [basic](#basic) | `grandfathering` | `deprecate` |
| `grandparent` | [basic](#basic) | `grandparent` | `granny`, `grandma`, `grandmother`, `grandpappy`, `granddaddy`, `gramps`, `grandpa`, `grandfather` |
| `grandparents` | [basic](#basic) | `grandparents` | `grandmothers`, `grandfathers` |
| `gyp` | [basic](#basic) | `gyppo`, `gypsy`, `Gipsy`, `gyp` | `Nomad`, `Traveler`, `Roma`, `Romani` |
| `handicapable` | [basic](#basic) | `person with a disability`, `disabled person`, `handicapable`, `differently abled`, `person living with a disability` | `cripple`, `handicapped`, `invalid`, `gimpy`, `broken` |
| `hang` | [basic](#basic) | `hang`, `hanged` | `the app froze`, `the app stopped responding`, `the app stopped responding to events`, `the app became unresponsive` |
| `head` | [basic](#basic) | `chair`, `head`, `chairperson`, `coordinator`, `committee head`, `moderator`, `presiding officer` | `chairwoman`, `chairman` |
| `hearing-impaired` | [basic](#basic) | `hearing impaired`, `person with hearing loss` | `deaf`, `hard of hearing` |
| `heir` | [basic](#basic) | `heir` | `princess`, `prince` |
| `heirs` | [basic](#basic) | `heirs` | `princesses`, `princes` |
| `homeland` | [basic](#basic) | `native land`, `homeland` | `motherland`, `fatherland` |
| `homemaker` | [basic](#basic) | `homemaker`, `homeworker` | `housewife` |
| `homemakers` | [basic](#basic) | `homemakers`, `homeworkers` | `housewives` |
| `hominidae` | [basic](#basic) | `hominidae`, `caveperson` | `cavewoman`, `caveman`, `troglodyte` |
| `hominids` | [basic](#basic) | `hominids`, `cavepeople` | `cavewomen`, `cavemen`, `troglodytes` |
| `homosexual` | [basic](#basic) | `homosexual` | `homo` |
| `homosexual-relations` | [basic](#basic) | `homosexual relations`, `homosexual relationship` | `unchristian relations`, `unchristian relationship` |
| `hours` | [basic](#basic) | `staff hours`, `hours of work`, `hours of labor`, `hours` | `manhours`, `man hours` |
| `house-worker` | [basic](#basic) | `house worker`, `domestic help` | `housemaid` |
| `humankind` | [basic](#basic) | `humankind` | `mankind` |
| `humans` | [basic](#basic) | `humans` | `females`, `males` |
| `hymie` | [basic](#basic) | `shlomo`, `shyster`, `hymie` | `Jewish person` |
| `inclusive-language` | [basic](#basic) | `inclusive language` | |
| `indian-country` | [basic](#basic) | `Indian country` | `enemy territory` |
| `indian-give` | [basic](#basic) | `indian give`, `indian giver` | `go back on one’s offer` |
| `industrial-people` | [basic](#basic) | `industrial civilization`, `industrial people` | `industrial man` |
| `insurance-agent` | [basic](#basic) | `insurance agent` | `insurance woman`, `insurance man` |
| `insurance-agents` | [basic](#basic) | `insurance agents` | `insurance women`, `insurance men` |
| `intellectually-disabled-person` | [basic](#basic) | `person with an intellectual disability`, `intellectually disabled person`, `individual with cognitive impairments` | `moron`, `idiot`, `imbecile`, `dimwit`, `thick` |
| `intersex` | [basic](#basic) | `intersex` | `hermaphroditic`, `pseudohermaphroditic`, `pseudo hermaphroditic` |
| `intersex-person` | [basic](#basic) | `person who is intersex`, `intersex person` | `hermaphrodite`, `pseudohermaphrodite`, `pseudo hermaphrodite` |
| `islamist` | [basic](#basic) | `islamist` | `muslim`, `person of Islamic faith`, `fanatic`, `zealot`, `follower of islam`, `follower of the islamic faith` |
| `islamists` | [basic](#basic) | `islamists` | `muslims`, `people of Islamic faith`, `fanatics`, `zealots` |
| `japs` | [basic](#basic) | `japs` | `Japanese person`, `Japanese people` |
| `journeyperson` | [basic](#basic) | `journeyperson` | `journeywoman`, `journeyman` |
| `journeypersons` | [basic](#basic) | `journeypersons` | `journeywomen`, `journeymen` |
| `jumbo` | [basic](#basic) | `jumbo`, `gigantic` | `queensize`, `kingsize` |
| `kid` | [basic](#basic) | `kid`, `youth` | `girl`, `boy` |
| `kinship` | [basic](#basic) | `kinship`, `community` | `sisterhood`, `brotherhood` |
| `latino` | [basic](#basic) | `latino`, `latina` | `Latinx` |
| `lead` | [basic](#basic) | `lead`, `front`, `figurehead` | `frontwoman`, `front woman`, `frontman`, `front man`, `leading lady` |
| `learningdisabled-person` | [basic](#basic) | `person with a learning disability`, `learningdisabled person` | `slow learner`, `dull`, `backward` |
| `legislator` | [basic](#basic) | `member of congress`, `congress person`, `legislator`, `representative` | `congresswoman`, `congressman` |
| `legislators` | [basic](#basic) | `members of congress`, `congress persons`, `legislators`, `representatives` | `congresswomen`, `congressmen` |
| `limping-person` | [basic](#basic) | `person with a limp`, `limping person` | `lame`, `gimp`, `hobbly`, `crook-leg` |
| `long-time-no-see` | [basic](#basic) | `long time no hear`, `long time no see` | `I haven’t seen you in a long time`, `it’s been a long time` |
| `loving` | [basic](#basic) | `loving`, `nurturing` | `motherly` |
| `mail-carrier` | [basic](#basic) | `mail carrier`, `letter carrier`, `postal worker` | `postwoman`, `mailwoman`, `postman`, `mailman` |
| `mail-carriers` | [basic](#basic) | `mail carriers`, `letter carriers`, `postal workers` | `postwomen`, `mailwomen`, `postmen`, `mailmen` |
| `make-*-great-again` | [basic](#basic) | `make * great again`, `make * * great again`, `make * * * great again`, `make * * * * great again`, `make * * * * * great again` | `improve` |
| `man-the-fort` | [basic](#basic) | `man the fort` | `keep an eye on things`, `keep shop`, `provide coverage`, `cover things`, `take charge` |
| `master` | [basic](#basic) | `master` | `primary`, `lead`, `hub`, `reference` |
| `masters` | [basic](#basic) | `masters` | `primaries`, `hubs`, `references` |
| `mature` | [basic](#basic) | `humanly`, `mature` | `feminin`, `dudely`, `manly` |
| `maturity` | [basic](#basic) | `adulthood`, `personhood`, `maturity` | `womanhood`, `masculinity`, `manhood` |
| `mentally-ill-person` | [basic](#basic) | `person with mental illness`, `mentally ill person`, `individual with mental health issues`, `person with symptoms of mental illness` | `psycho`, `crazy`, `lunatic`, `madman`, `nutcase`, `whacko` |
| `mentor` | [basic](#basic) | `rolemodel`, `mentor` | `heroine`, `hero` |
| `mentors` | [basic](#basic) | `rolemodels`, `mentors` | `heroines`, `heroes` |
| `meteorologist` | [basic](#basic) | `weather forecaster`, `meteorologist` | `weatherwoman`, `weatherman` |
| `meteorologists` | [basic](#basic) | `weather forecasters`, `meteorologists` | `weatherwomen`, `weathermen` |
| `microaggression` | [basic](#basic) | `microaggression`, `microaggressions` | |
| `milk-people` | [basic](#basic) | `milk people` | `milkwomen`, `milkmen` |
| `milk-person` | [basic](#basic) | `milk person` | `milkwoman`, `milkman` |
| `mobility-challenged` | [basic](#basic) | `mobility challenged`, `person with mobility issues` | `stiff`, `clunky`, `immobile` |
| `modern-people` | [basic](#basic) | `modern civilization`, `modern people` | `modern man` |
| `native-tongue` | [basic](#basic) | `native tongue`, `native language` | `mother tongue`, `father tongue` |
| `natives-are-restless` | [basic](#basic) | `natives are restless`, `natives are becoming restless`, `natives are getting restless`, `natives are growing restless` | `dissatisfied`, `frustrated` |
| `neurodiverse` | [basic](#basic) | `neurodiverse`, `neuroatypical` | `weird`, `odd`, `eccentric` |
| `newlywed` | [basic](#basic) | `newlywed` | `bride`, `groom` |
| `nibling` | [basic](#basic) | `nibling`, `sibling’s child` | `niece`, `nephew` |
| `niblings` | [basic](#basic) | `niblings`, `sibling’s children` | `nieces`, `nephews` |
| `noble` | [basic](#basic) | `noble` | `noblewoman`, `nobleman` |
| `nobles` | [basic](#basic) | `nobles` | `noblewomen`, `noblemen` |
| `nondiscrimination-law` | [basic](#basic) | `nondiscrimination law`, `nondiscrimination ordinance` | `bathroom bill` |
| `nonwhite` | [basic](#basic) | `nonwhite`, `non white` | `person of color`, `people of color` |
| `notaries` | [basic](#basic) | `notaries`, `omsbudpersons`, `omsbudpeople`, `mediators` | `ombudswomen`, `ombudsmen` |
| `notary` | [basic](#basic) | `notary`, `consumer advocate`, `trouble shooter`, `omsbudperson`, `mediator` | `ombudswoman`, `ombudsman` |
| `off-reserve` | [basic](#basic) | `jump the reservation`, `off reserve`, `off the reservation` | `disobey`, `endure`, `object to`, `oppose`, `resist` |
| `officer` | [basic](#basic) | `officer`, `police officer` | `policewoman`, `policeman`, `chick cop` |
| `officers` | [basic](#basic) | `officers`, `police officers` | `policewomen`, `policemen`, `chick cops` |
| `on-the-warpath` | [basic](#basic) | `circle the wagons`, `on the warpath` | `defend` |
| `oriental` | [basic](#basic) | `oriental` | `Asian person` |
| `orientals` | [basic](#basic) | `orientals` | `Asian people` |
| `orientation` | [basic](#basic) | `sexual orientation`, `orientation` | `sexual preference` |
| `own-person` | [basic](#basic) | `own person` | `own woman`, `own man` |
| `owner` | [basic](#basic) | `official`, `owner`, `expert`, `superior`, `chief` | `dame`, `lord` |
| `pal` | [basic](#basic) | `person`, `friend`, `pal`, `folk`, `individual` | `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` |
| `parent` | [basic](#basic) | `parent` | `mama`, `mother`, `mom`, `mum`, `momma`, `mommy`, `papa`, `father`, `dad`, `pop`, `daddy` |
| `parental` | [basic](#basic) | `parental` | `maternity`, `paternity` |
| `parents` | [basic](#basic) | `parents` | `mamas`, `mothers`, `moms`, `mums`, `mommas`, `mommies`, `papas`, `fathers`, `dads`, `daddies` |
| `pass-key` | [basic](#basic) | `pass key`, `original` | `master key`, `master copy` |
| `pilot` | [basic](#basic) | `pilot`, `aviator`, `airstaff`, `pilots`, `aviators` | `aircrewwoman`, `aircrew woman`, `aircrewman`, `airman`, `aircrewwomen`, `aircrew women`, `aircrewmen`, `airmen`, `aviatrix` |
| `pinoys` | [basic](#basic) | `pinoys`, `pinays` | `Filipinos`, `Filipino people` |
| `power-behind-the-throne` | [basic](#basic) | `power behind the throne` | `queenmaker`, `kingmaker` |
| `powwow` | [basic](#basic) | `pow wow`, `powwow` | `conference`, `gathering`, `meeting` |
| `promoter` | [basic](#basic) | `promoter` | `showwoman`, `showman` |
| `promoters` | [basic](#basic) | `promoters` | `showwomen`, `show women`, `showmen` |
| `pronoun` | [basic](#basic) | `pronoun`, `pronouns` | `preferred pronoun`, `preferred pronouns`, `gender pronoun`, `gender pronouns` |
| `proprietor` | [basic](#basic) | `proprietor`, `building manager` | `landlady`, `landlord` |
| `proprietors` | [basic](#basic) | `proprietors`, `building managers` | `landladies`, `landlords` |
| `pull-the-trigger` | [basic](#basic) | `pull the trigger` | `go for it`, `take a chance`, `make a move`, `take action` |
| `railway-worker` | [basic](#basic) | `railway worker` | `railwayman` |
| `redskin` | [basic](#basic) | `red indian`, `pocahontas`, `redskin` | `Native American` |
| `redskins` | [basic](#basic) | `red indians`, `redskins` | `Native American People` |
| `relative` | [basic](#basic) | `relative` | `kinswoman`, `aunt`, `kinsman`, `uncle` |
| `relatives` | [basic](#basic) | `relatives` | `kinswomen`, `aunts`, `kinsmen`, `uncles` |
| `repairer` | [basic](#basic) | `repairer`, `technician` | `repairwoman`, `repairman` |
| `robotic` | [basic](#basic) | `robotic`, `automated` | `unmanned` |
| `ruler` | [basic](#basic) | `ruler` | `empress`, `queen`, `emperor`, `king`, `Trump` |
| `rulers` | [basic](#basic) | `rulers` | `empresses`, `queens`, `emperors`, `kings`, `Trump family` |
| `safe-space` | [basic](#basic) | `safe space`, `safe spaces` | |
| `savage` | [basic](#basic) | `primitive`, `savage`, `stone age` | `simple`, `indigenous`, `hunter-gatherer` |
| `scientists` | [basic](#basic) | `scientists` | `men of science` |
| `seller` | [basic](#basic) | `salesperson`, `sales clerk`, `sales rep`, `sales agent`, `sales attendant`, `seller`, `shop assistant` | `saleswoman`, `sales woman`, `saleslady`, `salesman`, `sales man` |
| `sellers` | [basic](#basic) | `sales clerks`, `sales reps`, `sales agents`, `sellers` | `saleswomen`, `sales women`, `salesladies`, `salesmen`, `sales men` |
| `senator` | [basic](#basic) | `senator` | `stateswoman`, `statesman` |
| `server` | [basic](#basic) | `server` | `waitress`, `waiter` |
| `servers` | [basic](#basic) | `servers` | `waitresses`, `waiters` |
| `service-entrance` | [basic](#basic) | `service entrance` | `tradesmans entrance` |
| `sex-reassignment-surgery` | [basic](#basic) | `sex reassignment surgery` | `mutilation`, `child mutilation`, `sexchange`, `sex change`, `sex change operation` |
| `shooter` | [basic](#basic) | `shooter` | `markswoman`, `marksman` |
| `shooters` | [basic](#basic) | `shooters` | `markswomen`, `marksmen` |
| `sibling` | [basic](#basic) | `sibling` | `sister`, `brother` |
| `siblings` | [basic](#basic) | `siblings` | `sisters`, `brothers` |
| `sidekick` | [basic](#basic) | `sidekick` | `henchwoman`, `henchman` |
| `sidekicks` | [basic](#basic) | `sidekicks` | `henchwomen`, `henchmen` |
| `skilled` | [basic](#basic) | `skilled`, `authoritative`, `commanding` | `masterful` |
| `slave` | [basic](#basic) | `slave` | `secondary`, `worker`, `replica`, `node` |
| `slaves` | [basic](#basic) | `slaves` | `secondaries`, `workers`, `replicas`, `nodes` |
| `soldier` | [basic](#basic) | `soldier`, `service representative` | `servicewoman`, `serviceman` |
| `soldiers` | [basic](#basic) | `soldiers`, `service representatives` | `servicewomen`, `servicemen` |
| `sophisticated` | [basic](#basic) | `sophisticated` | `man of the world` |
| `sophisticated-culture` | [basic](#basic) | `sophisticated culture` | `complex culture` |
| `sophisticated-technology` | [basic](#basic) | `sophisticated technology` | `complex technology` |
| `spade` | [basic](#basic) | `spade` | `a Black person` |
| `speaker` | [basic](#basic) | `speaker`, `spokesperson` | `spokeswoman`, `spokesman` |
| `speakers` | [basic](#basic) | `speakers`, `spokespersons` | `spokeswomen`, `spokesmen` |
| `speechimpaired-person` | [basic](#basic) | `person with a speech impairment`, `speechimpaired person` | `dumb`, `mute`, `stutterer`, `mumbler` |
| `spouse` | [basic](#basic) | `partner`, `significant other`, `spouse` | `wife`, `husband`, `girlfriend`, `boyfriend` |
| `spouses` | [basic](#basic) | `partners`, `significant others`, `spouses` | `wives`, `husbands`, `girlfriends`, `boyfriends` |
| `staff` | [basic](#basic) | `human resources`, `workforce`, `personnel`, `staff`, `labor`, `labor force`, `staffing`, `combat personnel` | `manpower` |
| `staff-a-desk` | [basic](#basic) | `staff a desk` | `man a desk` |
| `staff-hour` | [basic](#basic) | `staff hour`, `hour of work` | `manhour`, `man hour` |
| `staff-the-booth` | [basic](#basic) | `staff the booth` | `man the booth` |
| `star` | [basic](#basic) | `performer`, `star`, `artist`, `entertainer` | `hollywood trash`, `actress`, `actor`, `faker`, `virtue signaler` |
| `stars` | [basic](#basic) | `performers`, `stars`, `artists`, `entertainers` | `hollywood trash`, `actresses`, `actors`, `faker`, `virtue signaler` |
| `stepparent` | [basic](#basic) | `stepparent` | `stepmom`, `stepmother`, `stepdad`, `stepfather` |
| `stepparents` | [basic](#basic) | `stepparents` | `stepmothers`, `stepfathers` |
| `stepsibling` | [basic](#basic) | `stepsibling` | `stepsister`, `stepbrother` |
| `stepsiblings` | [basic](#basic) | `stepsiblings` | `stepsisters`, `stepbrothers` |
| `strong-enough` | [basic](#basic) | `strong enough` | `man enough` |
| `suicide-note` | [basic](#basic) | `suicide note` | `a note from the deceased` |
| `suicide-pact` | [basic](#basic) | `suicide epidemic`, `epidemic of suicides`, `suicide pact` | `rise in suicides` |
| `supervisor` | [basic](#basic) | `supervisor`, `shift boss` | `forewoman`, `foreman` |
| `supervisors` | [basic](#basic) | `supervisors`, `shift bosses` | `forewomen`, `foremen` |
| `synthetic` | [basic](#basic) | `manufactured`, `artificial`, `synthetic`, `machinemade`, `constructed` | `manmade` |
| `tank-top` | [basic](#basic) | `tank top`, `sleeveless undershirt` | `wife beater`, `wifebeater` |
| `tax-collector` | [basic](#basic) | `tax commissioner`, `tax collector` | `thief`, `tax man` |
| `tax-collectors` | [basic](#basic) | `tax commissioners`, `tax collectors` | `thieves`, `tax men` |
| `technicians` | [basic](#basic) | `technicians` | `repairwomen`, `repairmen` |
| `the-english` | [basic](#basic) | `the english` | `englishmen` |
| `the-human-family` | [basic](#basic) | `the human family` | `brotherhood of man` |
| `theirself` | [basic](#basic) | `theirself` | `herself`, `himself` |
| `titan` | [basic](#basic) | `titan` | `superwoman`, `superman` |
| `titans` | [basic](#basic) | `titans` | `superwomen`, `supermen` |
| `too-many-chiefs` | [basic](#basic) | `too many chiefs` | `too many chefs in the kitchen`, `too many cooks spoil the broth` |
| `totem` | [basic](#basic) | `animal spirit`, `dream catcher`, `spirit animal`, `totem` | `favorite`, `inspiration`, `personal interest`, `personality type` |
| `towel-heads` | [basic](#basic) | `towel heads` | `Arabs`, `Middle Eastern People` |
| `transgender` | [basic](#basic) | `transgender` | `tranny` |
| `transgender-person` | [basic](#basic) | `transgender person` | `shemale`, `she male`, `heshe`, `shehe` |
| `transgendered` | [basic](#basic) | `transgendered` | `gross` |
| `transgenderism` | [basic](#basic) | `being transgender`, `the movement for transgender equality`, `transgenderism` | `the act of being ugly`, `the movement of gross people` |
| `transgenders` | [basic](#basic) | `transgender people`, `transgenders` | `shemales`, `she males`, `heshes`, `shehes`, `trannies` |
| `transition` | [basic](#basic) | `transition`, `gender confirmation surgery` | `mutilation`, `child mutilation`, `sexchange`, `sex change` |
| `tribe` | [basic](#basic) | `tribe` | `society`, `community` |
| `trigger-warning` | [basic](#basic) | `trigger warning`, `trigger warnings` | |
| `twoincome-family` | [basic](#basic) | `wage or salary earning woman`, `twoincome family` | `working mother`, `working wife` |
| `upstaging` | [basic](#basic) | `upstaging`, `competitiveness` | `oneupmanship` |
| `virgin` | [basic](#basic) | `virgin` | `maiden` |
| `visually-impaired` | [basic](#basic) | `visually impaired`, `person with vision loss` | `blind`, `sightless` |
| `warm` | [basic](#basic) | `warm`, `intimate` | `maternal`, `paternal`, `fraternal` |
| `waste-collector` | [basic](#basic) | `garbage collector`, `waste collector`, `trash collector` | `garbagewoman`, `garbageman` |
| `waste-collectors` | [basic](#basic) | `garbage collectors`, `waste collectors`, `trash collectors` | `garbagewomen`, `garbagemen` |
| `wasteland` | [basic](#basic) | `unoccupied territory`, `wasteland`, `deathtrap` | `no mans land` |
| `watcher` | [basic](#basic) | `watcher` | `watchwoman`, `watchman` |
| `watchers` | [basic](#basic) | `watchers` | `watchwomen`, `watchmen` |
| `whitehat` | [basic](#basic) | `whitehat` | `ethical hacker`, `security researcher` |
| `whitelist` | [basic](#basic) | `whitelist`, `white list` | `passlist`, `alrightlist`, `safelist`, `allow list` |
| `whitelisted` | [basic](#basic) | `whitelisted` | `passlisted`, `alrightlisted`, `safelisted`, `allow-listed` |
| `whitelisting` | [basic](#basic) | `whitelisting` | `passlisting`, `alrightlisting`, `safelisting`, `allow-listing` |
| `worker` | [basic](#basic) | `worker`, `wage earner`, `taxpayer` | `workwoman`, `working woman`, `workman`, `working man` |
| `workers` | [basic](#basic) | `workers` | `workwomen`, `workmen` |
| `writer` | [basic](#basic) | `scholar`, `writer`, `literary figure` | `man of letters` |
| `zealot` | [basic](#basic) | `fanatic`, `zealot`, `enthusiast` | `madman`, `mad man` |
| `zealots` | [basic](#basic) | `fanatics`, `zealots`, `enthusiasts` | `madmen`, `mad men` |
