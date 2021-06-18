module.exports = (container, usr_conf = {}) => {

    // ####################
    // ## Initialization ##
    // ####################

    // Find headers
    let headers = container.find('h1, h2, h3, h4, h5, h6');

    // Set configuration
    let config = {
        color: '#3c7dff',
        closed_by_default: false,
    }
    for (let atr in usr_conf) config[atr] = usr_conf[atr];

    // ###############
    // ## Functions ##
    // ###############

    let functions = {
        child_headers: function (index, size, headers) {
            let children = [];

            // Start from its own index (index of the current header).
            for (let i = index + 1; i < headers.length; i++) {
                let next_header = headers[i];
                let next_header_size = next_header.tagName.split('H')[1];

                // If header size is smaller than next header size, append it as a child
                if (size < next_header_size) children.push(next_header);
                else break;
            }

            // Return
            return children;
        },
        neighbor_header: function (index, header_size, headers) {
            let neighbor = null;

            // Start from the next header index
            for (let i = index + 1; i < headers.length; i++) {
                let next_header = headers[i];
                let next_header_size = next_header.tagName.split('H')[1];

                // If next header is larger or equal to the current header
                if (next_header_size <= header_size) {
                    neighbor = next_header;
                    break;
                }
            }

            // Return the neighbor
            return neighbor;
        },
        toggle_slide: function (header, neighbor = null) {
            // Select everything between neighbor header and the header OR everything after the header.
            let slide_elements = neighbor ? header.nextUntil(neighbor) : header.nextAll();

            // Check if has slided before
            let is_slided = header.attr('slide');

            // Slide
            if (is_slided) {
                header.removeAttr('slide');
                slide_elements.slideDown();
            } else {
                header.attr('slide', 1);
                slide_elements.slideUp();
            }

        },
    };

    // #########
    // ## RUN ##
    // #########

    function click_listener(header) {
        let children = functions.child_headers(header.index, header.size, headers);
        let neighbor = functions.neighbor_header(header.index, header.size, headers);

        // Slide
        functions.toggle_slide(header.jq, neighbor);

        // Disable slide of all the children
        $(children).each(function (i, item) {
            $(item).removeAttr('slide');
        });
    }

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    headers.each(function (i, item) {
        // Initialize the header
        let header = {
            index: i,
            size: this.tagName.split('H')[1],
            dom: item,
            jq: $(this),
        };

        // Add color to the headers
        header.jq.addClass('c-pointer').css({color: shadeColor(config.color, -(header.size * 15))});

        // Triggers
        header.jq.on('click', function () {
            click_listener(header);
        });

        // Close headers if has to
        if (config.closed_by_default) header.jq.click();
    });

};

