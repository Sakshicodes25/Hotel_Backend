
const MenuItem = require("../model/Menu");
const menuRegister = async (req,res) => {
  const { name, price, taste, is_drink, ingredients, num_sales } = req.body;

  // if (!name || !price || !taste || !is_drink || !ingredients || !num_sales) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }
  const MenuExixst = await MenuItem.findOne({ name });

  if (MenuExixst) {
    return res.status(400).json({ message: "this dish is already exist" });
  }

  try {
    const menu = await MenuItem.create({
      name,
      price,
      taste,
      is_drink,
      ingredients,
      num_sales,
    });

    return res.status(201).json({ message: "Menu saved successfully", menu });
  } catch (error) {
    e, console.error("Error saving menu:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const menuGET = async (req, res) => {
  try {
    const AllMenu = await MenuItem.find({});
    return res.status(201).json({ message: "all menu find successfully", AllMenu });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const menuTaste = async (req, res) => {
  const tasteType = req.params.taste;
  try {
    if (
      tasteType === "sweet" ||
      tasteType === "sour" ||
      tasteType === "spicy"
    ) {
      const sepByTaste = await MenuItem.find({ taste: tasteType });
      return res.status(201).json({ message: "menu found successfully", sepByTaste });
    } else {
      return res.status(401).json({ message: "choose specified taste" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const menuUpdate = async(req,res)=>{
  const idNo = req.params.id.trim();
  const updateMenuData = req.body;
  try {
    const updateMenu = await MenuItem.findByIdAndUpdate(idNo,updateMenuData,{
      new:true,
      runValidtors:true,
    });

    if(!updateMenu){
      return res.status(200).json({message:"MenuItem update failed"})
    }

    return res.status(200).json({message:"MenuItem Update successfully",
      data:updateMenu,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}

const menuDelete =async(req,res)=>{
  const idNo = req.params.id.trim();
  try {
    const deleteMenu = await MenuItem.findByIdAndDelete(idNo);
    if(!deleteMenu){
      return res.status(401).json({message:"delete MenuItem failed"})
    }
    return res.status(200).json({message:"MenuItem delete successfully",deleteMenu})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}


module.exports = {menuRegister,menuGET,menuTaste,menuUpdate,menuDelete};