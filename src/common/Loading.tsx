function Loading() {
	return (
		<div className="flex justify-center items-center mt-3 w-full h-52">
			<svg
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				className="w-28 h-12 mr-3 stroke-purple"
			>
				<circle
					cx="12"
					cy="12"
					r="10"
					fill="none"
					stroke=""
					stroke-width="4"
					stroke-dasharray="15.91549430918954 15.91549430918954"
					transform="rotate(0 12 12)"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						repeatCount="indefinite"
						dur="1s"
						values="0 12 12;360 12 12"
						keyTimes="0;1"
					></animateTransform>
				</circle>
			</svg>
		</div>
	);
}

export default Loading;
