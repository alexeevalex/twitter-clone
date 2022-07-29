// Set a default URL parameter value
if (!window.location.search) {
    window.location.search = "?user=alexalexeevb"
}

// Function to get the URL parameter
function getParameter(parameterName) {
    let params = new URLSearchParams(window.location.search);
    return params.get(parameterName);
}

// Get the URL parameter user value
let userValue = getParameter("user");

// Get the object of the user in the "database"
let userObject = users[userValue]


// ------ Follow Button Implementation ----- 
let following = false;
$(".follow-btn").on('click', function() {
    if (following === false) {
        $(".follow-btn").text('Following');

        $(".follow-btn").css({
            'background-color': 'white',
            'color': 'black',
            'border': '0.5px solid rgb(83, 100, 113)',
        });
        // $(".follow-btn").mouseleave(function() {
        // })

        following = true;
    } else {
        $(".follow-btn").text('Follow');
        
        $(".follow-btn").css({
            'background-color': 'black',
            'color': 'white',
            'border': 'none',
        });

        following = false;
    }
});

$(".follow-btn").hover(function() {
    if (following) {
        $(".follow-btn").text('Unfollow');

        $(".follow-btn").css({
            'background-color': 'rgba(244, 33, 46, 0.1)',
            'color': 'rgb(244, 33, 46)',
            'border-color': 'rgb(253, 201, 206)'
        });
    }
}, function() {
    if (following) {
        $(".follow-btn").text('Following');
        $(".follow-btn").css({
            'background-color': 'white',
            'color': 'black',
            'border': '0.5px solid rgb(83, 100, 113)'
        });
    }
});


// Generate all user's tweets first
for (i=0; i < userObject.tweets.length; i++) {
    let tweetDateString = new Date(userObject.tweets[i].timestamp).toDateString();
    $(".content-container").append(`
    <div class="tweet-container">
        <div class="tweet-profile-pict"></div>
        <div class="tweet-right">
            <div class="tweet-top-row">
                <div class="name-of-user-container">
                    <span class="name-of-user tweet"></span>
                    <img class="verified-checkmark tweet" src="/assets/icons/verified-checkmark.png" alt="Verified">
                    <span class="user-name"></span>
                    <span class="tweet-dot-separator">·</span>
                    <span class="tweet-date">${tweetDateString.slice(4,10) + "," + tweetDateString.slice(10)}</span>
                </div>
                <div>
                    <img class="tweet-more-options" src="/assets/icons/tweet-more-options.png" alt="More Options">
                </div>
            </div>
            <p class="tweet-content">
                ${userObject.tweets[i].text}
            </p>
            <div class="tweet-buttons">
                <div class="twt-btn comments">
                    <img src="/assets/icons/twt-btn.comments.png" alt="Comments">
                    <span class="num-of-comments">${formatNumber(userObject.tweets[i].comments)}</span>
                </div>
                <div class="twt-btn retweets">
                    <img src="/assets/icons/twt-btn.retweets.png" alt="Retweets">
                    <span class="num-of-retweets">${formatNumber(userObject.tweets[i].retweets)}</span>
                </div>
                <div class="twt-btn likes">
                    <img src="/assets/icons/twt-btn.likes.png" alt="Likes">
                    <span class="num-of-likes">${formatNumber(userObject.tweets[i].likes)}</span>
                </div>
                <div class="twt-btn share">
                    <img src="/assets/icons/twt-btn.share.png" alt="Share">
                </div>
            </div>
        </div>
    </div>`);
}

// Dynamically generate the current user information based on the url parameter
$(".name-of-user").text(userObject.displayName);
$(".number-of-tweets").text(`${userObject.tweets.length} Tweets`);
$(".background-image").css('background-image', `url(${userObject.coverPhotoURL}`);
$(".profile-picture").css('background-image', `url(${userObject.avatarURL}`);
$(".user-name").text(userObject.userName);
$(".info-description").text(userObject.description);
$(".info-joined-date").text(`Joined ${userObject.joinedDate}`);
$(".info-num-following").text(userObject.followingCount);
$(".info-num-followers").text(formatNumber(userObject.followerCount));
$(".tweet-profile-pict").css('background-image', `url(${userObject.avatarURL}`);

// Dynamically generate the right-container users
let userArray = Object.keys(users).map(function(key) {
    return users[key];
});

for (usr of userArray) {
    $(".right-container").append(`
        <div class="right-out-user-container" id="${usr.userName.slice(1).toLowerCase()}">
            <div class="flex-align-center-container">
                <div class="tweet-profile-pict" style="background-image: url(${usr.avatarURL})"></div>
                <div>
                    <div class="flex-align-center-container">
                        <span class="name-of-user tweet">${usr.displayName}</span>
                        <img class="verified-checkmark tweet" src="/assets/icons/verified-checkmark.png" alt="Verified">
                    </div>
                    <span class="user-name">${usr.userName}</span>
                </div>
            </div>
            <button class="follow-btn small">Follow</button>
        </div>`
    );
}

$(".right-out-user-container").on('click', function() {
    window.location.search = `?user=${$(this).attr("id")}`;
})


function formatNumber(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}