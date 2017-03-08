class Phrase {

    /*
        parses input word and creates layout
    */
    addLetters(phrase, mod)
    {
        var lineWidth = Math.min(maxLineWidth, phrase.length);
        var words = phrase.split(" ");

        var row;
        var lettersInRow = 0;
        var isOnlyRow = true;
        row = this.addRow(null, mod);

        for (var j = 0; j < words.length; j++)
        {
            var word = words[j];
            var projectedLength = word.length + lettersInRow + (lettersInRow > 0 ? 1 : 0);
            //check if word should be wrapped (shorter than lineWidth, but would make lettersInRow greater than lineWidth)
            if (word.length <= lineWidth && projectedLength > lineWidth)
            {
                row = this.addRow(row, mod);
                this.addWord(row, word);
                lettersInRow = word.length;
                isOnlyRow = false;
            }
            //check if word should be broken up (longer than lineWidth)
            else if (word.length > lineWidth)
            {
                this.addWord(row, word.substr(0, lineWidth-1) + "-");
                row = this.addRow(row, mod);
                this.addWord(row, word.substr(lineWidth-1));
                lettersInRow = word.length - lineWidth + 1;
                isOnlyRow = false;
            }
            else {
                if (lettersInRow > 0)
                {
                    this.addWord(row, " ");
                    lettersInRow++;
                }
                this.addWord(row, word);
                lettersInRow += word.length;
            }
        }
        this.sizeRow(row, isOnlyRow);

        var sizeMod = Math.min(mod, 100/4);
    	var size = ((sizeMod)/16 + 0.2);
    	letterContainer.css("font-size", size + "em");
        setTimeout(function(){
    		$(".letterCell").addClass("expanded");
    	}, 500);
    }

    /*
        Calculates size of row based on letters
    */
    sizeRow(row, isOnlyRow)
    {
        if (isOnlyRow)
        {
            var mod = Math.max(100 / row.children().length, 100 / maxLineWidth);
            $(".letterCell", row).css("width", mod + "%");
        }
        else{
            var percent = row.children().length / maxLineWidth * 100 + "%";
            row.width(percent);
            $(".letterCell", row).css("width", 100 / row.children().length + "%");
        }
    }

    /*
        Adds a new row for letters
    */
    addRow(row, mod)
    {
        if (row)
        {
            this.sizeRow(row);
        }
        var r = $("<div class='letterRow clearfix' lineWidth='" + mod + "'></div>");
        letterContainer.append(r);
        return r;
    }

    /*
        Adds letter to given row
    */
    addWord(row, word)
    {
        for (var i = 0; i < word.length; i++)
        {
            var div = $("<div class='letterCell'></div>");
            if (word.charAt(i) == " "){
                div.append($("<span style='opacity: 1;'>&nbsp;</span>"));
                div.append("<div style='background: none;'></div>")
            }
            else if (word.charAt(i) == "-"){
                div.append($("<span style='opacity: 1;'>-</span>"));
                div.append("<div style='background: none;'></div>")
            }
            else{
                div.append($("<span>" + word.charAt(i) + "</span>"));
                div.append("<div></div>")
            }
            row.append(div);
        }
    }

    revealLetter(letter)
    {
        $.each($(".letterCell", letterContainer), function(i, obj)
        {
            var cell = $("span", obj);
            if (cell.text() == letter)
            {
                cell.addClass("showing");
            }
        });
    }

    correct()
    {
        setTimeout(function(){
            $(".letterCell").addClass("right");
        }, 500);
    }

    incorrect()
    {
        setTimeout(function(){
            $(".letterCell").addClass("wrong");
            $(".letterCell > span").addClass("showing");
        }, 500);
    }
    exit()
    {
    	letterContainer.html("");
    	//allLetters.removeClass("showing");
    }
}
