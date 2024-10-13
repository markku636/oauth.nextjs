'use client';
export const CNFlag = ({ width = "640px", height = "480px" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 640 480"
			width={width}
			height={height}
		>
			<defs>
				<path id="a" fill="#ffde00" d="M-.6.8L0-1 .6.8-1-.3h2z" />
			</defs>
			<path fill="#de2910" d="M0 0h640v480H0z" />
			<use
				width="30"
				height="20"
				transform="matrix(71.9991 0 0 72 120 120)"
				xlinkHref="#a"
			/>
			<use
				width="30"
				height="20"
				transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"
				xlinkHref="#a"
			/>
			<use
				width="30"
				height="20"
				transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"
				xlinkHref="#a"
			/>
			<use
				width="30"
				height="20"
				transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)"
				xlinkHref="#a"
			/>
			<use
				width="30"
				height="20"
				transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)"
				xlinkHref="#a"
			/>
		</svg>
	);
};
