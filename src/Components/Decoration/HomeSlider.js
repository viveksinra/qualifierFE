import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { fetchData } from "../Api";
const resource = fetchData("/api/general/myimage/slider");

export default function HomeSlider() {
	const data = resource.data.read();
	const st = {
		showThumbs: false,
		autoPlay: true,
		infiniteLoop: true,
	};
	return (
		<Carousel {...st}>
			{data.map((d, i) => (
				<Link key={i} to={d.referLink}>
					<div>
						<img
							src={d.imageLink}
							style={{
								maxHeight: 290,
								maxWidth: "100%",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							alt={d.title}
						/>
					</div>
				</Link>
			))}
		</Carousel>
	);
}
