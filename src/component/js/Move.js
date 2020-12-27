class Move {
    constructor(segment, flow, render) {

        this.segment = segment;
        this.endNode = flow.endNode;
        this.grow = flow.grow;
        this.render = render;
    }

    makeMove(callBack) {
        
        this.segment.active = true;

        if (this.grow) {

            this.segment.flow = {
                endNode: this.endNode,
                percent: 0
            };

            this.segment.color = "green";

            console.log(this.segment, this.segment.flow.percent);

            var interval = setInterval(() => {

                console.log(this.segment.flow);

                console.log(interval);

                // if (this.segment.flow === false)
                //     clearInterval(interval);


                // this.segment.flow.percent += 2;

                // if (this.segment.flow.percent === 100) {

                //     clearInterval(interval);
                //     callBack();
                // }

                this.render();
            }, 1);
        } else {

            this.segment.flow = {
                endNode: this.endNode,
                percent: 100
            };

            this.segment.color = "red";

            interval = setInterval(() => {

                this.segment.flow.percent -= 1;

                if (this.segment.flow.percent === 0) {

                    this.segment.active = false;
                    clearInterval(interval);
                    callBack();
                }

                this.render();
            }, 1);
        }
    }
}

export default Move;
