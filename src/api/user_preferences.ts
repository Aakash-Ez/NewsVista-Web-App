import Cookies from 'js-cookie';

const questionMap: { [key: string]: string } = {
    question1: 'The government should provide universal healthcare',
    question2: 'Welfare programs are essential to help those in need',
    question3: 'Government regulation of the economy is necessary',
    question4: 'Higher taxes on the rich are needed to support public services',
    question5: 'Military spending should be increased',
    question6: 'The private sector is more efficient than the public sector',
    question7: 'Climate change should be a top priority for policy makers',
    question8: 'Religious values should influence government decisions',
    question9: 'The government should not interfere in free markets',
    question10: 'Healthcare is a right, not a privilege',
};

export const getUserPreferences = (): { [key: string]: string } | null => {
    const cookie = Cookies.get("User");
    if (!cookie) return null;

    console.log(cookie)

    const userData = JSON.parse(cookie);
    const userPreferences = userData.responses;

    if (!userPreferences) return null;

    const mappedPreferences: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(userPreferences)) {
        if (questionMap[key]) {
            mappedPreferences[questionMap[key]] = value as string;
        }
    }

    return mappedPreferences;
};
