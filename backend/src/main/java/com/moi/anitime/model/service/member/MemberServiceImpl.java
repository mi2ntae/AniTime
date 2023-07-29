package com.moi.anitime.model.service.member;

import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.exception.member.EditInfoException;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.exception.member.NonExistEmailException;
import com.moi.anitime.exception.member.PasswordIncorrectException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {
	private final MemberRepo memberRepo;
	private final PasswordEncoder passwordEncoder;
	private final S3Uploader s3Uploader;
	@Value("{shelterMember.evidence.path")
	private String imgPath;
	@Override
	public void registGeneralMember(GeneralMemberRegistReq memberRegistReq) throws ExistEmailException{
		if(memberRepo.findByEmail(memberRegistReq.getEmail()).isPresent()) throw new ExistEmailException();
		Member member = memberRegistReq.toEntity(passwordEncoder);
		memberRepo.save(member);
	}

	@Override
	public void registShelterMember(ShelterMemberRegistReq memberRegistReq, MultipartFile image) throws IOException, SQLException {
		if(memberRepo.findByEmail(memberRegistReq.getEmail()).isPresent()) throw new ExistEmailException();
		String storedFileName = s3Uploader.upload(image, imgPath);
		Member member = memberRegistReq.toEntity(passwordEncoder, storedFileName);
		memberRepo.save(member);
	}

	@Override
	public Member login(MemberLoginReq memberLoginReq) throws NonExistEmailException{
		Member member = memberRepo.findByEmail(memberLoginReq.getEmail()).orElseThrow(NonExistEmailException::new);
		if(!passwordEncoder.matches(memberLoginReq.getPassword(), member.getPassword())) throw new PasswordIncorrectException();
		return member;
	}

	@Override
	public Member findGeneralMemberById(int memberNo) throws NonExistMemberNoException {
		Optional<GeneralMember> member = memberRepo.findGeneralMemberByMemberNo(memberNo);
		if(!member.isPresent()) throw new NonExistMemberNoException();
		return member.get();
	}

	@Override
	public Member findShelterMemberById(int memberNo) throws NonExistMemberNoException {
		Optional<ShelterMember> member = memberRepo.findShelterMemberByMemberNo(memberNo);
		if(!member.isPresent()) throw new NonExistMemberNoException();
		return member.get();
	}

	@Override
	public void editGeneralMember(int memberNo, GeneralMember requestMember) throws EditInfoException {
		String encodedPassword=passwordEncoder.encode(requestMember.getPassword());
		memberRepo.updateMemberByMemberNo(memberNo,encodedPassword, requestMember.getName());
	}

	@Override
	public List<ShelterMember> findAllShelterMember() throws NonExistMemberNoException {

		return null;
	}


//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	UserRepositorySupport userRepositorySupport;
//
//	@Autowired
//	PasswordEncoder passwordEncoder;
//
//	@Override
//	public User createUser(UserRegisterPostReq userRegisterInfo) {
//		User user = new User();
//		user.setUserId(userRegisterInfo.getId());
//		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
//		return userRepository.save(user);
//	}
//
//	@Override
//	public User getUserByUserId(String userId) {
//		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		User user = userRepositorySupport.findUserByUserId(userId).get();
//		return user;
//	}
}
