const person = require("../model/Person");

 const personRegister = async (req, res) => {
  const { name, age, work, mobile, email, salary, address } = req.body;

  const AllreadyExist = await person.findOne({ $or: [{ email }, { name }] });

  if (AllreadyExist) {
    if (AllreadyExist.email === email) {
      return res.status(400).json({ message: "Person already exsist" });
    } else if (AllreadyExist.name === name) {
      return res
        .status(400)
        .json({ message: "this Name Person already exists" });
    }
  }
  // Check for missing fields
  if (!name || !age || !work || !mobile || !email || !salary || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await person.create({
      name,
      age,
      work,
      mobile,
      email,
      salary,
      address,
    });

    return res.status(201).json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const personWorkers = async (req, res) => {
  try {
    const AllUsers = await person.find({});

    if (!AllUsers) {
      return res.status(500).json({ message: "person not found" });
    }

    return res
      .status(201)
      .json({ message: "all users find successfully", AllUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const personWork = async (req, res) => {
  const workType = req.params.work;

  try {
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const sepByWt = await person.find({ work: workType });

      return res
        .status(201)
        .json({ message: "data fetch successfully", sepByWt });
    } else {
      return res.status(201).json({ message: "Invalid WorkType" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const personId =  async (req, res) => {
  const idNo = req.params.id.trim();
  console.log(idNo);
  try {
    const sepByIdNo = await person.findById(idNo); // Correct usage

    if (!sepByIdNo) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User found successfully",
      data: sepByIdNo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const personUpdate = async (req, res) => {
  const idNo = req.params.id.trim();
  const updatedPersonData = req.body;

  try {
    const updatedPerson = await person.findByIdAndUpdate(
      idNo,
      updatedPersonData,
      {
        new: true,
        runValidtors: true,
      }
    );

    if (!updatedPerson) {
      return res.status(200).json({
        message: "person update failed",
      });
    }

    return res.status(200).json({
      message: "person Upadated successfully",
      data: updatedPerson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


const personDelete =  async (req, res) => {
  const idNo = req.params.id.trim();
  try {
    const deletedPerson = await person.findByIdAndDelete(idNo);

    if (!deletedPerson) {
      return res.status(200).json({
        message: "person deleted failed",
      });
    }
    return res.status(200).json({
      message: "person Deleted successfully",
      data: deletedPerson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {personRegister,personWorkers,personWork,personId,personUpdate,personDelete}