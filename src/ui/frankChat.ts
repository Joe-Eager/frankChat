let isLocked = false;
let angerLevel = 0; // Tracks Frank's anger level
const angerThreshold = 5; // When reached, Frank replies angrily (but doesn't lock)

// Positive rat responses
const positiveRatResponses = [
	'Frank is interested.',
	'Frank edges closer, tongue flicking.',
	"Frank's pupils dilate with excitement.",
	'Frank starts licking profusely.',
	'Frank perks up instantly.',
	'Frank watches intently, coiled and ready.',
	'Frank slithers forward, very intrigued.'
];

// // Negative words/phrases related to harming or banning rats
// const negativeRatWords = [
// 	'destroy',
// 	'exterminate',
// 	'annihilate',
// 	'eradicate',
// 	'obliterate',
// 	'curse',
// 	'ban',
// 	'hate',
// 	'eliminate',
// 	'remove',
// 	'abolish',
// 	'forsake',
// 	'denounce',
// 	'reject',
// 	'flush',
// 	'throw away',
// 	'get rid of',
// 	'no more',
// 	'kill',
// 	'wipe out',
// 	'extinct',
// 	'banish'
// ];

// // Function to detect negative rat-related language
// function isNegativeRatStatement(input) {
// 	return negativeRatWords.some((word) => input.includes(word) && input.includes('rat'));
// }

// Snoot boop detection
function isBoopingSnoot(input: string) {
	return (
		input.includes('boop') ||
		input.includes('snoot boop') ||
		input.includes('booping snoot') ||
		input.includes('boop your snoot')
	);
}

// List of variations for "can't," "wont," "dont" to catch typos
const typoVariations = ["can't", 'cant', "won't", 'wont', "don't", 'dont'];

// Function to detect rat denials, including typos
function isDenyingRat(input: string) {
	return (
		(input.includes('deny') && input.includes('rat')) ||
		typoVariations.some(
			(variation) =>
				input.includes(variation) && input.includes('give') && input.includes('rat')
		) ||
		typoVariations.some(
			(variation) =>
				input.includes(variation) && input.includes('have') && input.includes('rat')
		) ||
		(input.includes('unable to give') && input.includes('rat')) ||
		input.includes('no rat to give') ||
		input.includes('no rats for frank') ||
		input.includes('no rat for frank') ||
		input.includes('i refuse to give you a rat') ||
		input.includes('you are not getting a rat') ||
		input.includes('frank is not getting a rat') ||
		input.includes('not giving you a rat') ||
		input.includes('no rats') ||
		input.includes('takes away rat') ||
		input.includes('removes rat') ||
		input.includes('steals rat back') ||
		input.includes('snatches rat from frank') ||
		input.includes('no rat') ||
		input.includes('frank loses the rat')
	);
}

// High anger responses (when angerLevel is at or above the threshold)
const highAngerResponses = [
	'Frank hisses fiercely, her eyes narrowing with disdain.',
	'Frank coils tightly, flicking her tongue in irritation.',
	"Frank's scales ripple as she fixes you with a cold glare.",
	'Frank flicks her tongue sharply, showing clear displeasure.'
];

// Feeding failure responses (90% chance when feeding fails)
const feedingFailureResponses = [
	'Frank misses completely.',
	'Frank lunges forward and bonks the glass.',
	'Frank strikes but bites herself.'
];

// Neutral responses for other inputs (snakey, noncommittal)
// "Frank says nothing." is added three times to increase its chance.
const neutralResponses = [
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank says nothing.',
	'Frank stares at you, unamused.',
	'Frank is too tired to care.',
	'Frank sighs.',
	'Frank curls up and ignores you.',
	'Frank stares at the ceiling.',
	'Frank gives you a blank look.',
	"Frank pretends she didn't hear that.",
	'Frank looks the other way.',
	'Frank is not impressed.',
	'Frank is too busy doing nothing.',
	'Frank gives you a slow, unblinking stare.',
	'Frank is clearly not interested.',
	'Frank is busy... doing absolutely nothing.',
	'Frank yawns.',
	"Frank doesn't even bother to look at you.",
	'Frank slithers off without saying a word.',
	'Frank just sits there. Silent.',
	'Frank rolls her eyes (if snakes could roll their eyes).',
	"Frank stares at you like you've said something foolish.",
	'Frank gives you a long, silent stare.',
	'Frank sneezes in your general direction.',
	"Frank doesn't even flinch.",
	'Frank is having none of this.',
	'Frank seems to have fallen asleep.',
	'Frank hisses softly and says nothing.',
	'Frank looks bored.',
	'Frank flicks her tongue, then ignores you.',
	'Frank just sits there. Existing.',
	"Frank doesn't dignify that with a response.",
	'Frank slithers into the void.',
	'Frank seems to have mentally checked out.',
	'Frank stares into the middle distance.',
	'Frank stares blankly at the wall.',
	'Frank gives you a look of mild disdain.',
	'Frank is doing her best to look uninterested.'
];

function handleFrankChat(input: string) {
	let response = '';

	// If Frank is locked (digesting)
	if (isLocked) {
		// If the input contains "dingus", unlock Frank
		if (input.includes('dingus')) {
			isLocked = false;
			angerLevel = 0; // Reset anger when unlocked
			response = 'Frank is back. What do you want?';
		} else {
			response = 'Frank is digesting. You need to say the magic word to wake her up.';
		}
	}
	// Process feeding: if input includes "rat" and either "give" or "feed"
	else if (input.includes('rat') && (input.includes('give') || input.includes('feed'))) {
		// 10% chance of success
		if (Math.random() < 0.1) {
			angerLevel = Math.max(0, angerLevel - 1); // Reduce anger when a rat is fed successfully
			response = '*Frank snatches the rat and drags it around for 2 hours*';
			isLocked = true; // Lock Frank to digest the rat
			response += ' Frank is digesting. You need to say the magic word to wake her up.';
		} else {
			// Feeding fails, so choose a failure response (she does not lock)
			response =
				feedingFailureResponses[Math.floor(Math.random() * feedingFailureResponses.length)];
		}
	}
	// If the input denies giving a rat, increase anger and respond
	else if (isDenyingRat(input)) {
		angerLevel++;
		// Use a milder angry response if anger hasn't reached the threshold
		if (angerLevel < angerThreshold) {
			response = [
				'Frank coils up, heartbroken.',
				'Frank hisses softly and flicks her tongue.',
				'Frank stares at you with a cold, silent glare.',
				'Frank flicks her tongue in clear disappointment.',
				'Frank disappears into a tight coil, sulking.'
			][Math.floor(Math.random() * 5)];
		} else {
			// Once anger exceeds threshold, use high anger responses
			response = highAngerResponses[Math.floor(Math.random() * highAngerResponses.length)];
		}
	}
	// If anger level is high (from previous denials), reply angrily
	else if (angerLevel >= angerThreshold) {
		response = highAngerResponses[Math.floor(Math.random() * highAngerResponses.length)];
	}
	// If user mentions "quail", give a fixed response
	else if (input.includes('quail')) {
		response = 'FRANK IS BANNED FROM QUAILS.';
	}
	// If user boops the snoot, give a boop reaction
	else if (isBoopingSnoot(input)) {
		response = [
			'Frank recoils instantly, her eyes narrowing.',
			'Frank hisses and coils back.',
			'Frank flinches, her gaze filled with betrayal.',
			'Frank flicks her tongue sharply in disapproval.',
			"Frank stares at you coldly. Don't do that again.",
			'Frank freezes, her posture radiating displeasure.',
			'Frank actually dislikes snoot boops.'
		][Math.floor(Math.random() * 7)];
	}
	// If the user just mentions "rat" (without feeding or denial), give a positive response
	else if (input.includes('rat')) {
		response = positiveRatResponses[Math.floor(Math.random() * positiveRatResponses.length)];
	}
	// Otherwise, choose a neutral snakey response
	else {
		response = neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
	}

	return response;
}

export default handleFrankChat;
