exports.handler = async function (context, event, callback) {

    // let lastRetrieval = context.LAST_RETRIEVAL

    // if(lastRetrieval == null || lastRetrieval == undefined || lastRetrieval == ''){
    //     lastRetrieval = Date.now()
    //     context.LAST_RETRIEVAL = lastRetrieval
    // }

    // retrieve the synced file

    const client = context.getTwilioClient(context.TWILIO_ACCOUNT_SID, context.TWILIO_AUTH_TOKEN)

    console.log(client)

    client.sync.v1.services(process.env.VOICE_GUIDELINES_SERVICE_SID)
    .documents
    .create({
        uniqueName: 'countries-list',
        data: {
            countries:
            [
                {
                "name": "Argentina (AR)",
                "link": "/en-us/guidelines/ar/voice"
                },
                {
                "name": "Australia (AU)",
                "link": "/en-us/guidelines/au/voice"
                },
                {
                "name": "Austria (AT)",
                "link": "/en-us/guidelines/at/voice"
                },
                {
                "name": "Belgium (BE)",
                "link": "/en-us/guidelines/be/voice"
                },
                {
                "name": "Benin (BJ)",
                "link": "/en-us/guidelines/bj/benin--voice-guidelines---twilio"
                },
                {
                "name": "Brazil (BR)",
                "link": "/en-us/guidelines/br/voice"
                },
                {
                "name": "Bulgary (BG)",
                "link": "/en-us/guidelines/bg/voice"
                },
                {
                "name": "Canada (CA)",
                "link": "/en-us/guidelines/ca/voice"
                },
                {
                "name": "China (CN)",
                "link": "/en-us/guidelines/cn/voice"
                },
                {
                "name": "Croatia (HR)",
                "link": "/en-us/guidelines/hr/voice"
                },
                {
                "name": "Czech Republic (CZ)",
                "link": "/en-us/guidelines/cz/voice"
                },
                {
                "name": "Denmark (DK)",
                "link": "/en-us/guidelines/dk/voice"
                },
                {
                "name": "Estonia (EE)",
                "link": "/en-us/guidelines/ee/voice"
                },
                {
                "name": "Finland (FI)",
                "link": "/en-us/guidelines/fi/voice"
                },
                {
                "name": "France (FR)",
                "link": "/en-us/guidelines/fr/voice"
                },
                {
                "name": "Germany (DE)",
                "link": "/en-us/guidelines/de/voice"
                },
                {
                "name": "Ghana (GH)",
                "link": "/en-us/guidelines/gh/ghana--voice-guidelines---twilio"
                },
                {
                "name": "Greece (GR)",
                "link": "/en-us/guidelines/gr/voice"
                },
                {
                "name": "Grenada (GD)",
                "link": "/en-us/guidelines/gd/grenada--voice-guidelines---twilio"
                },
                {
                "name": "Hong Kong (HK)",
                "link": "/en-us/guidelines/hk/voice"
                },
                {
                "name": "Hungary (HU)",
                "link": "/en-us/guidelines/hu/voice"
                },
                {
                "name": "Iceland (IS)",
                "link": "/en-us/guidelines/is/voice"
                },
                {
                "name": "India (IN)",
                "link": "/en-us/guidelines/in/voice"
                },
                {
                "name": "Indonesia (ID)",
                "link": "/en-us/guidelines/id/voice"
                },
                {
                "name": "Ireland (IE)",
                "link": "/en-us/guidelines/ie/voice"
                },
                {
                "name": "Israel (IL)",
                "link": "/en-us/guidelines/il/israel--voice-guidelines---twilio"
                },
                {
                "name": "Japan (JP)",
                "link": "/en-us/guidelines/jp/voice"
                },
                {
                "name": "Kenya (KE)",
                "link": "/en-us/guidelines/ke/kenya--voice-guidelines---twilio"
                },
                {
                "name": "Luxemburg (LU)",
                "link": "/en-us/guidelines/lu/voice"
                },
                {
                "name": "Malaysia (MY)",
                "link": "/en-us/guidelines/my/voice"
                },
                {
                "name": "Mali (ML)",
                "link": "/en-us/guidelines/ml/mali--voice-guidelines---twilio"
                },
                {
                "name": "Mexico (MX)",
                "link": "/en-us/guidelines/mx/voice"
                },
                {
                "name": "Namibia (NA)",
                "link": "/en-us/guidelines/na/namibia--voice-guidelines---twilio"
                },
                {
                "name": "Netherlands (NL)",
                "link": "/en-us/guidelines/nl/voice"
                },
                {
                "name": "New Zealand (NZ)",
                "link": "/en-us/guidelines/se/voice"
                },
                {
                "name": "Norway (NO)",
                "link": "/en-us/guidelines/no/voice"
                },
                {
                "name": "Philippines (PH)",
                "link": "/en-us/guidelines/ph/voice"
                },
                {
                "name": "Poland (PL)",
                "link": "/en-us/guidelines/pl/voice"
                },
                {
                "name": "Portugal (PT)",
                "link": "/en-us/guidelines/pt/voice"
                },
                {
                "name": "Romania (RO)",
                "link": "/en-us/guidelines/ro/voice"
                },
                {
                "name": "Russia (RU)",
                "link": "/en-us/guidelines/ru/voice"
                },
                {
                "name": "Singapore (SG)",
                "link": "/en-us/guidelines/sg/voice"
                },
                {
                "name": "Slovenia (SI)",
                "link": "/en-us/guidelines/si/voice"
                },
                {
                "name": "South Africa (ZA)",
                "link": "/en-us/guidelines/za/south-africa--voice-guidelines---twilio"
                },
                {
                "name": "Spain (ES)",
                "link": "/en-us/guidelines/es/voice"
                },
                {
                "name": "Sweden (SE)",
                "link": "/en-us/guidelines/se/voice"
                },
                {
                "name": "Switzerland (CH)",
                "link": "/en-us/guidelines/ch/voice"
                },
                {
                "name": "Taiwan (TW)",
                "link": "/en-us/guidelines/tw/voice"
                },
                {
                "name": "Thailand (TH)",
                "link": "/en-us/guidelines/th/voice"
                },
                {
                "name": "Tunisia (TN)",
                "link": "/en-us/guidelines/tn/tunisia--voice-guidelines---twilio"
                },
                {
                "name": "Turkey (TR)",
                "link": "/en-us/guidelines/tr/voice"
                },
                {
                "name": "Uganda (UG)",
                "link": "/en-us/guidelines/ug/uganda--voice-guidelines---twilio"
                },
                {
                "name": "Ukraine (UA)",
                "link": "/en-us/guidelines/ua/voice"
                },
                {
                "name": "United Arab Emirates (AE)",
                "link": "/en-us/guidelines/ae/voice"
                },
                {
                "name": "United Arab Emirates (AE)",
                "link": "/en-us/guidelines/ae/voice"
                },
                {
                "name": "United Kingdom (GB)",
                "link": "/en-us/guidelines/gb/voice"
                },
                {
                "name": "United States (US)",
                "link": "/en-us/guidelines/us/voice"
                },
                {
                "name": "Vietnam (VN)",
                "link": "/en-us/guidelines/vn/voice"
                }
            ]
        }
    })
    .then((document) => {
        console.log(document);
        return callback(null, document);
    })
    .catch((error) => {
        console.log('Sync Error: ', error);
        return callback(error);
    })
    
}
