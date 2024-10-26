

const ShoeCard = ({ imgURL, ChangeBigImage, bigShoeImage }) => {

    const handleClick = () => {
        if (bigShoeImage !== imgURL.bigShoe) {
            ChangeBigImage(imgURL.bigShoe)
        }
    }

    return (
        <div
            className={`border-2 
                ${bigShoeImage === imgURL
                    ? "border-coral-red"
                    : "border-transparent"
                } cursor-pointer max-sm:flex-1
                rounded-xl`}
                 onClick={handleClick}
        >
            <div
                className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40
                sm:h-40 rounded-xl max-sm:p-4"
            >
                <img
                    src={imgURL.thumbnail}
                    alt="shoe collection"
                    width={127}
                    height={103}
                    className="object-contain"
                />
            </div>
        </div>
    )
}

export default ShoeCard;