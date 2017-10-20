/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// UI fixture
const STYLE = "";
const FIXTURE = {
	mflick1: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC">
						<p>Layer 0</p>
					</div>
					<div style="background-color:#66cccc">
						<p>Layer 1</p>
					</div>
					<div style="background-color:#ffc000">
						<p>Layer 2</p>
					</div>
				</div>`,
	mflick1_1: `<div style="${STYLE}" class="flick">
					<div class="eg-flick-container">
						<div style="background-color:#CC66CC">
							<p>Layer 0</p>
						</div>
						<div style="background-color:#66cccc">
							<p>Layer 1</p>
						</div>
						<div style="background-color:#ffc000">
							<p>Layer 2</p>
						</div>
					</div>
				</div>`,
	mflick2: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC">
						<p>Layer 0</p>
					</div>
					<div style="background-color:#66cccc">
						<p>Layer 1</p>
					</div>
					<div style="background-color:#ffc000">
						<p>Layer 2</p>
					</div>
				</div>`,
	mflick2_1: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC">
					<p>Layer 0</p>
				</div>
				<div style="background-color:#66cccc">
					<p>Layer 1</p>
				</div>
				</div>`,
	mflick3: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC">
						<p>Layer 0</p>
					</div>
					<div style="background-color:#66cccc">
						<p>Layer 1</p>
					</div>
					<div style="background-color:#ffc000">
						<p>Layer 2</p>
					</div>
					<div style="background-color:green">
						<p>Layer 3</p>
					</div>
					<div style="background-color:maroon">
						<p>Layer 4</p>
					</div>
				</div>`,
	mflick3_1: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC">
						<p>Layer 0</p>
					</div>
					<div style="background-color:#66cccc">
						<p>Layer 1</p>
					</div>
					<div style="background-color:green">
						<p>Layer 2</p>
					</div>
				</div>`,
	mflick4: `<div style="${STYLE}" class="flick">
					<div style="background-color:#CC66CC;">
						<p style="padding:5px;margin:5px">Layer 0</p>
					</div>
					<div style="background-color:#66cccc;">
						<p>
							Layer 1<br>
							Layer 1<br>
							Layer 1<br>
							Layer 1<br>
							Layer 1<br>
							Layer 1<br>
						</p>
					</div>
					<div style="background-color:#ffc000;">
						<p>Layer 2</p>
						<br>
						<p>Multiple elements on one panel also supported</p>
					</div>
				</div>`
};

export default FIXTURE;
