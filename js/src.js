$(document).ready(function () {
    function displayFootBallPlayerInfo(playerName) {
        var apikey = "105d192607d8440b9f685b69817db641"
        $.ajax({
            url: "https://api.sportsdata.io/v3/nfl/scores/json/Players/Ten?key=" + apikey,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var findPlayer = response.filter(function (name) {
                return name.Name === playerName
            })
            findPlayer.forEach(function (name) {
                var playerName = $("<h5>")
                var playerImage = $("<img>")
                var age = $("<p>")
                var collage = $("<p>")
                var playerDiv = $("<div>")
                var position = $("<p>")
                var birthDate = $("<p>")
                var height = $("<p>")
                var weight = $("<p>")
                playerName.attr("class", "playerId")
                var numberOfSeasons = $("<p>")
                age.text("Age: " + name.Age)
                playerDiv.attr("class", "col-6")
                playerDiv.attr("style", "background-color:white")
                playerImage.attr("src", name.PhotoUrl)
                playerName.text(name.FirstName + " " + name.LastName)
                birthDate.text("Birth Date: " + name.BirthDateString)
                height.text("Height: " + name.Height)
                weight.text("Weight: " + name.Weight)
                collage.text("Collage: " + name.College)

                numberOfSeasons.text("Number of Played Seasons: " + name.ExperienceString)
                convertFootBallTerms(name, position)
                playerDiv.append(playerImage)
                playerDiv.append(playerName)
                playerDiv.append(position)
                playerDiv.append(collage)
                playerDiv.append(numberOfSeasons)
                playerDiv.append(age)
                playerDiv.append(birthDate)
                playerDiv.append(height)
                playerDiv.append(weight)
                $("#display-names").append(playerDiv)
            })
        })
    }

    function convertFootBallTerms(name, position) {
        switch (name.FantasyPosition) {
            case "QB":
                position.text("Position : " + "Quarterback")
                break;
            case "WR":
                position.text("Position : " + "Wide Receiver")
                break
            case "RB":
                position.text("Position: " + "Running Back")
                break
            case "TE":
                position.text("Position: " + "Tight End")
                break
            case "K":
                position.text("Position: " + "Kicker")
                break
            case "ST":
                position.text("Position: " + "Special Teams")
                break
            case "D":
                position.text("Position: " + "Defensive Player")
                break
            case "DL":
                position.text("Position: " + "Defensive Linemen	")
                break
            case "DB":
                position.text("Position: " + "Defensive Back	")
                break
            case "DB":
                position.text("Position: " + "Defensive Back	")
                break
            case "LB":
                position.text("Position: " + "linebackers")
                break
            case "DT":
                position.text("Position: " + "Defensive Tackles	")
                break
            case "DE":
                position.text("Position: " + " defensive ends	")
                break
            case "CB":
                position.text("Position: " + "Cornerbacks")
                break
            case "S":
                position.text("Position: " + "Safeties")
                break
                case "OL":
                    position.text("Position: " + "Offensive Lineman")
                    break
        }
    }    function displayPlayerStats(search){
        var apikey = "105d192607d8440b9f685b69817db641"
        var years = $("#years :selected")
        console.log(years.val())
        $.ajax({
            url: "https://api.sportsdata.io/v3/nfl/scores/json/Players/Ten?key=" + apikey,
            method: "GET"
        }).then(function(response){
        var player = response.find(function(players){
        return players.Name === search
        })
        
        $.ajax({
            url: "https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByPlayerID/"+ years.val()  +"/"+ player.PlayerID +"?key=" + apikey, 
            method: "GET"
        }).then(function(response){
        console.log(response)
        response.forEach(function(plays){
            var playerDiv  =$("<div>")
            playerDiv.attr("class","col-6")
            playerDiv.attr("class","playerInfo")
            var statsTitle = $("<h2>")
            statsTitle.text("Player Stats")
            var interceptions = $("<p>")
            interceptions.text("Interceptions: " + plays.Interceptions)
            var passingAttempts = $("<p>")
            passingAttempts.text("Passing Attempts: " + plays.PassingAttempts)
            var passesDefended = $("<p>")
            passesDefended.text("Passes Defended: " + plays.PassesDefended)
            var passingCompletePercentage = $("<p>")
            passingCompletePercentage.text("Passing Percentage: " + plays.PassingCompletionPercentage)
            var passingYard = $("<p>")
            passingYard.text(" Passing Yard: " + plays.PassingYards)
            var puntAverage =$("<p>")
            puntAverage.text("Punts Average: " + plays.PuntAverage)
            var puntLong =$("<p>")
            puntLong.text("Punt Long: " + plays.PuntLong)
            var puntYards =$("<p>")
            puntYards.text("Punt Yards: " + plays.PuntYards)
            var punts= $("<p>")
            punts.text("Punts: " + plays.Punts)
            var rushingAttempts =$("<p>") 
            rushingAttempts.text("Rushingk Attempts: " + plays.RushingAttempts)
            var touchDown =$("<p>")
            touchDown.text("TouchDown: " + plays.Touchdowns)
         
            playerDiv.append(statsTitle)
            playerDiv.append(passingAttempts)
            playerDiv.append(passesDefended)
            playerDiv.append(passingCompletePercentage)
            playerDiv.append(passingYard)
            playerDiv.append(puntAverage)

            playerDiv.append(punts)
            playerDiv.append(puntLong)
            playerDiv.append(puntYards)
            playerDiv.append(interceptions)
            playerDiv.append(rushingAttempts)
            playerDiv.append(touchDown)
        
            $("#display-names").append(playerDiv)
        })  
        })
        })
        }
        
    $("#btn-search").on("click", function () {
        $("#display-names").empty()

        var search = $("#searchPlayers").val()
        displayFootBallPlayerInfo(search)
        displayPlayerStats(search)
        $("#searchPlayers").val("")
    })
    $("#btn-list").on("click", function () {
        var apikey = "105d192607d8440b9f685b69817db641"
        $.ajax({
            "async": true,
            "crossDomain": true,
            url: "httpS://api.sportsdata.io/v3/nfl/scores/json/Players/Ten?key=" + apikey,
            method: "GET",
        }).then(function (response) {
            response.forEach(function (name) {
                $("#modal-body").append(name.Name + ", ")
            })
        })
    })
    $("#teamSchedule").on("click",function(){
        var apiKey ="nmpe8puyqsmqbeujbmyd485u"
         $.ajax({
         url:"https://api.sportradar.us/nfl-ot2/games/2019/reg/schedule.json?api_key=nmpe8puyqsmqbeujbmyd485u",
         method:"GET"
         }).then(function(response){
         console.log(response)
         })
         })

     })
