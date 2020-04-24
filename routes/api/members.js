const express = require("express");
const members = require("../../Members");
const router = express.Router();
const uuid = require("uuid");
//This Route gets all members
router.get("/", (req, res) => {
  res.json(members);
});
//Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  //"SOME" is to return true or false
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member found for the id ${req.params.id}` });
  }
});

//Create Member (when anything added to the database)
router.post("/", (req, res) => {
  //This "/" will indicate "/api/members" which is a route
  //res.send(req.body); //To see the post data in postman but you have to add those types in header and body and raw json
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

//Update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  //"SOME" is to return true or false
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member found for the id ${req.params.id}` });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  //"SOME" is to return true or false
  if (found) {
    res.json({
      msg: "Memeber Deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member found for the id ${req.params.id}` });
  }
});

module.exports = router;
