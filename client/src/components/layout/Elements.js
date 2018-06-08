import React, {Component} from 'react';

class Elements extends Component{
    render(){
        return(
            //<!-- Elements -->
            <section id="elements">
                <h2 class="major">Elements</h2>

                <section>
                    <h3 class="major">Text</h3>
                    <p>This is <b>bold</b> and this is <strong>strong</strong>. This is <i>italic</i> and this is <em>emphasized</em>.
                        This is <sup>superscript</sup> text and this is <sub>subscript</sub> text.
                        {/*This is <u>underlined</u> and this is code: <code>for (;;) { ... }</code>. Finally, <a href="#">this is a link</a>.*/}

                    </p>
                    <hr />
                    <h2>Heading Level 2</h2>
                    <h3>Heading Level 3</h3>
                    <h4>Heading Level 4</h4>
                    <h5>Heading Level 5</h5>
                    <h6>Heading Level 6</h6>
                    <hr />
                    <h4>Blockquote</h4>
                    <blockquote>Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan faucibus. Vestibulum ante ipsum primis in faucibus lorem ipsum dolor sit amet nullam adipiscing eu felis.</blockquote>
                    <h4>Preformatted</h4>
                    {/*<pre><code>i = 0;*/}

                    {/*while (!deck.isInOrder()) {*/}
                            {/*print 'Iteration ' + i;*/}
                            {/*deck.shuffle();*/}
                            {/*i++;*/}
                        {/*}*/}

                        {/*print 'It took ' + i + ' iterations to sort the deck.';</code></pre>*/}
                </section>
            </section>
        )
    }
}

export default Elements